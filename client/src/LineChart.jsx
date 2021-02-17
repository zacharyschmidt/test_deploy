import React from 'react';
import Chart from 'react-google-charts';

const LineChart = (props) => {
  // let dataset = [{_id: "",
  //     title: "",
  //     citation: "",
  //     year: "",
  //     values: "",
  //     units: "",
  //     physical: "",
  //     //accessed_date: new Date(),
  //     data_source: "",
  //     is_derived: "true",
  //     parents: ""}]
  // if (props.dataset.length > 0) {
  //     dataset = props.dataset
  // }
  // console.log(dataset)
  // let graphVals = dataset.map(data => {
  //  let floats = data.values.replace(/\[|\]/g, '').split(",").map(item => {
  //   return parseFloat(item.trim().split(" ")[0])})
  //   return( floats = [...[`${data.title}`], ...floats] )
  // })
  // console.log(graphVals)
  // let graphYears = dataset[0].year.split(",").map(year => {
  //   return new Date(parseInt(year), 1, 1).getFullYear()
  // })
  // graphYears = [...['x'], ...graphYears]

  // function zip() {
  //   var args = [].slice.call(arguments);
  //   var longest = args.reduce(function(a, b){
  //     return a.length>b.length ? a : b
  //   }, []);
  //   return longest.map(function(_,i){
  //     return args.map(function(array){return array[i]})
  //   })
  // }
  // let graphTuples = zip(graphYears, ...graphVals)
  // console.log(graphTuples)
  // // let graphTuples = graphYears.map(function(year, i) {
  // //   return [year, graphVals[i]];
  // // });

  // //graphTuples = [['x', `${dataset[0].title}`], ...graphTuples]

  return (
    <Chart
      width={'600px'}
      height={'400px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={props.data}
      options={{
        hAxis: {
          title: props.time,
          format: '####'
        },

        vAxis: {
          title: props.units
        }
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default LineChart;
