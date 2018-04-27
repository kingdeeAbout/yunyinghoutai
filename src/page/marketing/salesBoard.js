/**
 * Created by dadawang on 2018/2/7.
 */
import React from 'react'
import {observer, inject} from 'mobx-react'
import {Row, Col, Table} from 'antd'
import './salesBoard.less'
import SplineCharts from '../../components/common/highcharts/splineCharts'
// import SolidGaugeCharts from "../../components/common/highcharts/solidgaugeCharts";
import Cards from '../../components/market/cards'
import CardTabs from '../../components/market/cardTabs'
import SalesInfoCard from '../../components/market/SaleManageBasicInfor'
// import TargetModal from '../../components/common/modal/target'
// import FullScreen from '../../components/common/fullScreen/fullScreen'


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
@inject("store")
@observer
export default class SalesBoard extends React.Component {
  constructor(props) {
    super(props);
    this.marketingStore = props.store.marketingStore;
  }

  componentDidMount() {
    this.marketingStore.getMarketingList();
  }

  componentWillUnmount() {
    this.marketingStore.clear();
  }

  render() {
    // const dom = document.getElementById('fullScreen');
    const { marketingData, activeId, setActiveId, activeMarketing } = this.marketingStore;

    return (
      <div className="mt35 container-fluid fullScreen" id="fullScreen">
        {/*<FullScreen*/}
          {/*fullDom ={dom}>*/}
        {/*</FullScreen>*/}
        <Row>
          <Col xs={24} lg={8} xxl={5}>
            <div>
              <Cards
                listData={marketingData}
                activeId={activeId}
                selectItem={setActiveId}
                // stores={this.standStore}
              />
              {/*<Tabs defaultActiveKey="1" onChange={this.callback}>*/}
                {/*<TabPane tab="已达标" key="1">*/}
                  {/*<Cards*/}
                    {/*listData={this.store.CardsData}*/}
                    {/*activeId={this.store.activeId}*/}
                    {/*selectItem={this.store.setActiveCard}*/}
                    {/*// stores={this.standStore}*/}
                  {/*/>*/}
                {/*</TabPane>*/}
                {/*<TabPane tab="未达标" key="2">*/}
                  {/*<Cards*/}
                  {/*listData={this.store.CardsData}*/}
                  {/*activeId={this.store.activeId}*/}
                  {/*selectItem={this.store.setActiveCard}*/}
                  {/*// stores={this.standStore}*/}
                  {/*/>*/}
                {/*</TabPane>*/}
              {/*</Tabs>*/}
            </div>
          </Col>
          <Col xs={24} lg={16} xxl={14}>
            {
              activeMarketing &&
              <div className="panel border-bottom hidden-xxl">
                <SalesInfoCard
                  basicData={activeMarketing}
                  size="large"
                  type="1"
                />
              </div>
            }
            <CourierStatPanel />
          </Col>
          {
            activeMarketing &&
            <Col xs={0} lg={0} xxl={5}>
              <div className="panel">
                <SalesInfoCard
                  basicData={activeMarketing}
                  type="1"
                />
              </div>
              {/*<div className="panel pt30 pb20 mt20">*/}
              {/*<div className="flex-box">*/}
              {/*<div className="box-item item-left-title ml15">本月运营目标*/}
              {/*<TargetModal />*/}
              {/*</div>*/}
              {/*<div className="box-item item-right-title mr10 pointor">其他月份</div>*/}
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
          }
        </Row>
      </div>
    )
  }
}