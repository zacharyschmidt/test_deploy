import React from 'react';
import { Store } from './Store';
import { DatasetDetailsProps } from './redux/actions/eia/interfaces';
import { fetchDataSeriesAction } from './Actions';
import LineChart from './LineChart';
import DataTable from './DataTable';
import AddButton from './components/add-button/AddButton';

const DatasetDetails = (props: any): JSX.Element => {
  console.log(props.match.params.series_id);
  const series_id = props.match.params.series_id;
  const { state, dispatch } = React.useContext(Store);
  console.log(state);
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
  console.log(state);
  const dataset = state.seriesData.filter(
    (series: any) => series.series_id === series_id
  );
  console.log(dataset);

  const series = (dataset: any) => {
    if (dataset.length > 0) {
      if (parseInt(dataset[0].data[1][0]) < parseInt(dataset[0].data[2][0])) {
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
  console.log(correctedSeries);
  //console.log(series);
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
            <AddButton onClick={() => alert('clicked')} />
          </section>
        </section>
      </section>
    </section>
  );
};

export default DatasetDetails;
