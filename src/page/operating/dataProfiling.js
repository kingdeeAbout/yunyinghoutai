import React from 'react'
import {observer, inject} from 'mobx-react';
import { Row, Col, Radio} from 'antd';
import './dataProfiling.less'
import Splinecharts from '../../components/common/highcharts/splineCharts'
import Piecharts from '../../components/common/highcharts/pieCharts'
import Format from '../../libs/format'

const format = new Format();

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

/*注入 stores 的方法*/
@inject("store")
@observer
class HourStatPanel extends React.Component {
  constructor(props) {
    super(props);
    this.operatingStore = props.store.operatingStore;
  }

  componentDidMount() {
    this.operatingStore.getHourStatData();
  }

  render() {
    const { hourStatChartData } = this.operatingStore;
    return (
      <div className="panel p15 pb30">
        <div className="item-title">实时订单数据</div>
        <div className="pt30">
          <Splinecharts chartData={hourStatChartData} height="313" xAxisType="category" />
        </div>
      </div>
    )
  }
}

@inject("store")
@observer
class StatPanel extends React.Component {
  constructor(props) {
    super(props);
    this.operatingStore = props.store.operatingStore;
  }

  componentDidMount() {
    this.operatingStore.getStatData('today');
  }

  componentWillUnmount() {
    this.operatingStore.clear();
  }

  handleRadioChange = (e) => {
    // console.log(e.target.value);
    this.operatingStore.getStatData(e.target.value);
  };

  render() {
    const { statData } = this.operatingStore;
    return (
      <div className="panel p30">
        <RadioGroup onChange={this.handleRadioChange} defaultValue="today">
          <RadioButton value="today">今日</RadioButton>
          <RadioButton value="yesterday">昨日</RadioButton>
          <RadioButton value="all">累计</RadioButton>
        </RadioGroup>
        <Row className="pt30">
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="box-spline">
              <div className="box-spline-num">{statData && statData.expCount ? format.formatLongNumber(statData.expCount) : 0}</div>
              <div className="box-spline-title">订单量</div>
              {/*<Splinecharts chartData={statData} width="130" height="50" showAxis={false} />*/}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="box-spline">
              <div className="box-spline-num">{statData && statData.onlinePayed ? format.formatLongNumber(statData.onlinePayed) : 0}</div>
              <div className="box-spline-title">收款</div>
              {/*<Splinecharts chartData={statData} width="130" height="50" showAxis={false} />*/}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="box-spline">
              <div className="box-spline-num">{statData && statData.activeMarkets ? format.formatLongNumber(statData.activeMarkets) : 0}</div>
              <div className="box-spline-title">活跃快递员</div>
              {/*<Splinecharts chartData={statData} width="130" height="50" showAxis={false} />*/}
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="box-spline ">
              <div className="box-spline-num">{statData && statData.newMarkets ? format.formatLongNumber(statData.newMarkets) : 0}</div>
              <div className="box-spline-title">新注册用户</div>
              {/*<Splinecharts chartData={statData} width="130" height="50" showAxis={false} />*/}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}


@inject("store")
@observer
class PiePanel extends React.Component {
  constructor(props) {
    super(props);
    this.operatingStore = props.store.operatingStore;
  }

  componentDidMount() {
    this.operatingStore.getPieData('today');
  }

  handleRadioChange = (e) => {
    // console.log(e.target.value);
    this.operatingStore.getPieData(e.target.value);
  };

  render() {
    const { expSourcePieChartData, expTabidPieChartData, kuaidiComPieChartData, payedPieChartData } = this.operatingStore;
    return (
      <div className="panel mt20 p30">
        <RadioGroup onChange={this.handleRadioChange} defaultValue="today">
          <RadioButton value="today">今日</RadioButton>
          <RadioButton value="yesterday">昨日</RadioButton>
          <RadioButton value="all">累计</RadioButton>
        </RadioGroup>
        <Row className="pt30">
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="box-pie">
              <Piecharts chartData={kuaidiComPieChartData} unit="单" />
              <div className="box-spline-title">快递公司订单量占比</div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="box-pie">
              <Piecharts chartData={expSourcePieChartData} unit="单" />
              <div className="box-spline-title">下单来源占比</div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="box-pie">
              <Piecharts chartData={expTabidPieChartData} unit="单" />
              <div className="box-spline-title">订单状态占比</div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className="box-pie">
              <Piecharts chartData={payedPieChartData} unit="元" />
              <div className="box-spline-title">已取件订单支付方式占比</div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default class OperateCenter extends React.Component {
  render() {
    return (
      <div className="mt35 container-fluid">
        <Row>
          <Col xs={24} sm={24} md={24} lg={16}>
            <HourStatPanel />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <StatPanel />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <PiePanel />
          </Col>
        </Row>
      </div>
    )
  }
}