import React from 'react';
import Highcharts from './highcharts';


export default class Piecharts extends React.Component{
  render() {
    const chartData = this.props.chartData;
    let colors = []
    if(chartData.length > 6) {
      colors = ['#3c81f0', '#4f8df1', '#639af3', '#76a7f4', '#8ab3f6',
        '#9dc0f7', '#b1cdf9', '#c4d9fa', '#d4e3fc', '#dce8fc'];
    } else if(chartData.length > 4) {
      colors = ['#3c81f0', '#639af3', '#8ab3f6', '#b1cdf9',  '#d4e3fc', '#dce8fc'];
    } else if(chartData.length > 2) {
      colors = ['#3c81f0', '#76a7f4', '#b1cdf9', '#dce8fc'];
    } else {
      colors = ['#3c81f0', '#dce8fc'];
    }
    const config = {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      chart: {
        width: 180,
        height: 180,
        type: 'pie',
        spacing: [0, 0, 0, 0],
        className: 'center-block'
      },
      colors: colors,
      tooltip: {
        pointFormat: '<b>{point.y}' + this.props.unit + ' {point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          borderWidth: 0,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        data: chartData
      }]
    };
    return (
      <Highcharts config={config}/>
    )
  }
}