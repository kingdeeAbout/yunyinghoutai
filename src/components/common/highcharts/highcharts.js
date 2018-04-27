import React from 'react';
import ReactHighcharts from 'react-highcharts';

require("highcharts/js/highcharts-more")(ReactHighcharts.Highcharts);
require("highcharts/js/modules/solid-gauge.js")(ReactHighcharts.Highcharts);
require('highcharts-no-data-to-display')(ReactHighcharts.Highcharts)

export default class Highcharts extends React.Component{
  componentDidMount() {
    ReactHighcharts.Highcharts.setOptions({
      lang:{
        loading: "正在加载...",
        noData: "无数据",
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        shortMonths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        weekdays: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      }
    });
  }
  render() {
    return (
      <ReactHighcharts config={this.props.config} />
    )
  }
}