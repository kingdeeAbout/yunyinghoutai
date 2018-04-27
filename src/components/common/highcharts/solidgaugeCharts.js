import React from 'react';
import Highcharts from './highcharts';

export default class Solidgauge extends React.Component{
  constructor(props) {
    super(props);

    const config = {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'solidgauge',
        height: 100,
        spacing: [0, 0, 0, 0]
      },
      tooltip: {
        enabled: false
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        size: 100,
        background: [{
          outerRadius: '100%',
          innerRadius: '90%',
          backgroundColor: "#dfdfdf",
          borderWidth: 0
        }]
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: true,
            format: '{y}%',
            y: -18,
            borderWidth: 0,
            style: {"fontSize":"24px"}
          },
          linecap: 'round',
          rounded: true
        }
      },
      series: [{
        name: '',
        data: [
        // {
        //   color: '#dfdfdf',
        //   radius: '100%',
        //   innerRadius: '90%',
        //   y: 100
        // },
        {
          color: '#317ee7',
          radius: '100%',
          innerRadius: '90%',
          y: 78
        }]
      }]
    };
    this.state = {
      config : config
    }
  }
  render() {
    return (
      <Highcharts config={this.state.config} />
    )
  }
}