/**
 * Created by dadawang on 2018/3/7.
 */
import React from 'react'
import {inject, observer} from 'mobx-react'
import './dataBoard.less'
import {Row, Col, Table} from 'antd'
import SplineCharts from '../../components/common/highcharts/splineCharts'
// import SolidGaugeCharts from "../../components/common/highcharts/solidgaugeCharts"
import CardTabs from '../../components/market/cardTabs'
import SalesInfoCard from '../../components/market/SaleManageBasicInfor'

@inject("store")
@observer
class CourierStatPanel extends React.Component {
  constructor(props) {
    super(props);
    this.courierStore = props.store.courierStore;
  }

  componentWillUnmount() {
    this.courierStore.clear();
  }

  render() {
    const { tabData, activeTabId, setActiveTab, courierChartData, courierTableColumn, courierTableData, isLoading } = this.courierStore;
    return (
      <div>
        <div className="panel border-bottom">
          <CardTabs
            listData={tabData}
            activeId={activeTabId}
            selectTab={setActiveTab}
          />
        </div>
        <div className="panel border-bottom p30 pb60">
          <SplineCharts chartData={courierChartData} />
        </div>
        <div>
          <Table
            dataSource={courierTableData}
            columns={courierTableColumn}
            loading={isLoading}
            locale={{emptyText: '暂无数据'}}
            rowKey={(record, index)=>(index)}
          />
        </div>
      </div>
    )
  }
}

/*注入 stores 的方法*/
// @inject("store")
// @observer
// class StatPanel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.store = props.store.operatingStore;
//   }
//
//   componentDidMount() {
//     this.store.getSalesStatData();
//   }
//
//   render() {
//     const statData = this.store.salesStatData;
//     return (
//       <div className="panel p30">
//         <Row>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline">
//               <div className="box-spline-num">{statData ? statData.onlinePayed : 0}</div>
//               <div className="box-spline-title">今日收款</div>
//             </div>
//           </Col>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline">
//               <div className="box-spline-num">{statData ? statData.expCount : 0}</div>
//               <div className="box-spline-title">今日订单量</div>
//             </div>
//           </Col>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline ">
//               <div className="box-spline-num">{statData ? statData.newMarkets : 0}</div>
//               <div className="box-spline-title">今日新用户</div>
//             </div>
//           </Col>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline">
//               <div className="box-spline-num">{statData ? statData.activeMarkets : 0}</div>
//               <div className="box-spline-title">今日活跃用户</div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     )
//   }
// }

@inject("store")
@observer
export default class DataBoard extends React.Component {
  constructor(props) {
    super(props);
    this.marketingStore = props.store.marketingStore;
  }
  componentDidMount() {
    this.marketingStore.getSalesInfo();
  }

  render() {
    const { salesBasicInfo } = this.marketingStore;
    return (
      <div className="mt35 container-fluid data-board">
        <Row>
          <Col xs={24} sm={24} md={24} lg={18}>
            <CourierStatPanel />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6}>
            <SalesInfoCard
              basicData={salesBasicInfo}
              type="1"
            />
            {/*<div className="panel mt20">*/}
              {/*<StatPanel />*/}
            {/*</div>*/}
            {/*<div className="panel pt30 pb20 mt20">*/}
              {/*<div className="flex-box">*/}
                {/*<div className="box-item item-left-title ml15">本月运营目标</div>*/}
                {/*<div className="box-item item-right-title mr10">其他月份</div>*/}
              {/*</div>*/}
              {/*<div className="flex-box mt40">*/}
                {/*<div className="box-item">*/}
                  {/*<SolidGaugeCharts />*/}
                {/*</div>*/}
                {/*<div className="box-item">*/}
                  {/*<div className="box-item-num mb10">40,762</div>*/}
                  {/*<div className="box-item-title">本月新用户指标</div>*/}
                  {/*<div className="box-item-num-long">198,982</div>*/}
                {/*</div>*/}
              {/*</div>*/}
              {/*<div className="flex-box mt40">*/}
                {/*<div className="box-item">*/}
                  {/*<SolidGaugeCharts />*/}
                {/*</div>*/}
                {/*<div className="box-item">*/}
                  {/*<div className="box-item-num mb10">40,762</div>*/}
                  {/*<div className="box-item-title">本月新用户指标</div>*/}
                  {/*<div className="box-item-num-long">198,982</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          </Col>
        </Row>
      </div>
    )
  }
}