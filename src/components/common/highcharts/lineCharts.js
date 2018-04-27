import React from 'react';
import Highcharts from './highcharts';

export default class LineCharts extends React.Component{

  render() {
    const config = {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      chart: {
        height: 600,
        spacing: [10, 10, 10, 10]
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      legend: {
        enabled: false
      },
      noData: {
        style: {
          fontSize: "16px",
          fontWeight: "bold"
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%b-%e',
          week: '%b-%e',
          month: '%b'
        },
        tickLength: 0
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [{
        name: '统计',
        data: this.props.chartData
      }]
    };

    return (
      <Highcharts config={config} />
    )
  }
}