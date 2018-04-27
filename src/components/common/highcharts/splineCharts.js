import React from 'react';
import Highcharts from './highcharts';


export default class SplineCharts extends React.Component{

  render() {
    const config = {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      chart: {
        width: this.props.width,
        height: this.props.height,
        type: 'spline',
        spacing: [10, 10, 10, 10]
      },
      colors: ['#3c81f0', '#3c81f0'],
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip:{
        dateTimeLabelFormats: {
          day: '%Y年%b月%e日',
          week: '%Y年%b月%e日',
          month: '%b月'
        }
      },
      legend: {
        enabled: false
      },
      xAxis: {
        type: this.props.xAxisType ? this.props.xAxisType : 'datetime',
        dateTimeLabelFormats: {
          day: '%b-%e',
          week: '%b-%e',
          month: '%b'
        },
        tickLength: 0,
        tickInterval: this.props.xAxisType === 'category' ? 4 : null,
        visible: this.props.showAxis
      },
      yAxis: {
        title: {
          text: ''
        },
        visible: this.props.showAxis
      },
      series: this.props.chartData
    };

    return (
      <Highcharts config={config} />
    )
  }
}