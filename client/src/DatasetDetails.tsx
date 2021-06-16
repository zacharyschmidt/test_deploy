import React from 'react';
import XLSX from 'xlsx';

import { DatasetDetailsProps } from './types';
import { fetchDataSeriesAction } from './redux/actions/eia/actions';
import LineChart from './LineChart';
import DataTable from './DataTable';
import AddButton from './components/add-button/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from './types';

const DatasetDetails = (props: any): JSX.Element => {
  const series_id = props.match.params.series_id;
  const dispatch = useDispatch();
  const state = useSelector((state: IStore) => state.eia);

  // problem: state seriesData array is getting to many versions of the dataset.
  //move logic to check for multiple selections of same dataseries in here
  React.useEffect(() => {
    if (
      state.seriesData.filter((series: any) => series.series_id === series_id)
        .length === 0
    ) {
      fetchDataSeriesAction(dispatch, props.match.params.series_id, state);
    }
  });

  const dataset = state.seriesData.filter(
    (series: any) => series.series_id === series_id
  );

  const series = (dataset: any) => {
    if (dataset.length > 0) {
      // need to figure out a better way to test order of series
      // some series are quarterly, some are annual? what about others?
      if (parseInt(dataset[0].data[1][0]) < parseInt(dataset[0].data[5][0])) {
        return dataset[0].data.map((series: any) => {
          return [series[0], Math.round(series[1] * 10 + Number.EPSILON) / 10];
        });
      } else {
        return dataset[0].data.reverse().map((series: any) => {
          return [series[0], Math.round(series[1] * 10 + Number.EPSILON) / 10];
        });
      }
    } else {
      return [];
    }
  };
  const correctedSeries = series(dataset);

  const data =
    dataset.length > 0 ? [['x', `${dataset[0].name}`], ...correctedSeries] : [];
  // if (parseInt(dataset[1][0]) > parseInt(dataset[2][0])) {
  //   d;
  // }
  const lineChartData = data.filter((onePeriod) => !(onePeriod[1] === 'NA'));
  const units = dataset.length > 0 ? `${dataset[0].units}` : '';
  const id = dataset.length > 0 ? `${dataset[0].series_id}` : '';
  const freq = dataset.length > 0 ? `${dataset[0].f}` : '';
  const time = freq === 'A' ? 'Year' : freq;
  const name = dataset.length > 0 ? `${dataset[0].name}` : '';

  const columns = (dataset: any) => {
    if (dataset.length > 0) {
      var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      const header = [
        ['series id', dataset[0].series_id],
        ['name', dataset[0].name],
        ['units', dataset[0].units],
        ['frequency', dataset[0].f],
        ['notes', dataset[0].description],
        ['last updated', dataset[0].updated],
        ['', ''],
        ['file generated', utc],
        [
          'Contact: Zachary Schmidt, Koomey Analytics, zacharym.schmidt@gmail.com',
          ''
        ]
      ];
      return header;
    } else {
      return [];
    }
  };
  const header = columns(dataset);
  var worksheet = XLSX.utils.aoa_to_sheet(header.concat(correctedSeries));
  var new_workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_workbook, worksheet, 'Sheet1');

  const handleClickXL: any = () => {
    XLSX.writeFile(new_workbook, `${dataset[0].name}.xlsx`);
  };

  const handleClickRIS: any = () => {
    let testRIS = `TY  - DATA
      DA  - 2014///
      ID  - temp_id_379229159811
      LB  - temp_id_379229159811
      N1  - The Annual Energy Outlook (AEO) from EIA.gov provides long term foreca
      sts (25 years) of U.S. energy production, consumption, and trade for 
      t he United Stated of electricity, petroleum, natural gas, coal, nucle
      ar , and renewable sources.
      PB  - U.S. Energy Information Administration
      TI  - Annual Energy Outlook 2014
      UR  - http://api.eia.gov/bulk/AEO2014.zip
      ER  - `;
  };

  // const styles: { [key: string]: React.CSSProperties } = {
  //   downloadButton: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     gridRowStart: '2',
  //     gridRowEnd: '3',
  //     gridColumnStart: '4',
  //     gridColumnEnd: '5'
  //   }
  // };
  return (
    <section>
      <h2>Series Name: {name}</h2>
      <h2>Series ID: {series_id}</h2>
      <section className="chartAndtable">
        <section>
          <DataTable
            data={data}
            units={units}
            time={time}
            id={id}
            name={name}
          />
        </section>
        <section>
          <LineChart data={lineChartData} units={units} time={time} />
          <section>
            <AddButton
              onClick={handleClickXL}
              text="Download RIS"
              filename="Test.xlsx"
            />
            <AddButton
              onClick={handleClickRIS}
              text="Download RIS"
              filename="Test.xlsx"
            />
          </section>
          <section></section>
        </section>
      </section>
    </section>
  );
};

export default DatasetDetails;
