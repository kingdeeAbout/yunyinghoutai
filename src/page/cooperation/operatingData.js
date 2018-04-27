
import React from 'react'
import {observer, inject} from 'mobx-react'
import {Row, Col, Table} from 'antd'
import SplineCharts from '../../components/common/highcharts/splineCharts'
// import SolidGaugeCharts from "../../components/common/highcharts/solidgaugeCharts"
import Cards from '../../components/project/cards'
import CardTabs from '../../components/market/cardTabs'
import InfoCard from '../../components/project/info'
import Breadcrumb from '../../components/common/breadcrumb'
// import TargetModal from '../../components/common/modal/target'

@inject("store")
@observer
class ProjectBreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store.projectStore;
  }

  handleBreadcrumbClick = (item) => {
    console.log('gotoBreadcrumb:', item.name);
    this.store.gotoBreadcrumb(item);
    this.store.getProjectAreaList({
      sbid: item.sbid
    });
  }

  render() {
    const breadcrumbData = this.store.breadcrumb.toJS();
    return (
      <Breadcrumb breadcrumbData={breadcrumbData} selectItem={this.handleBreadcrumbClick} />
    )
  }
}

/*注入 stores 的方法*/
@inject("store")
@observer
export default class OperatingData extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store.projectStore;
    this.courierStore = props.store.courierStore;
  }

  componentDidMount() {
    this.store.getProjectAreaList({});
    this.store.clearBreadcrumb();
    this.store.addBreadcrumb({
      sbid: '',
      name: '全部'
    });
  }

  handleCardsOpenClick = (e, item) => {
    console.log('addBreadcrumb:', item.name);
    e.stopPropagation();
    this.store.getProjectAreaList({
      sbid: item.sbid
    });
    this.store.addBreadcrumb(item);
  }

  render() {
    const detailData = this.courierStore.courierData;
    const detailChartData = this.courierStore.courierChartData;
    const detailTableColumn = this.courierStore.courierTableColumn;
    const detailTableData = this.courierStore.courierTableData;

    return (
      <div className="ml10 mt35 container-fluid">
        <Row>
          <ProjectBreadCrumb />
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={5}>
            <div>
              <Cards
                listData={this.store.projectList}
                activeId={this.store.activeId}
                selectItem={this.store.setProjectAreaActiveCard}
                openItem={this.handleCardsOpenClick}
              />
            </div>
          </Col>
          { detailData && detailData.data &&
          <Col xs={24} sm={24} md={24} lg={14}>
            <div className="panel border-bottom">
              <CardTabs
                listData={this.courierStore.tabData}
                activeId={this.courierStore.activeTabId}
                selectTab={this.courierStore.setActiveTab}
                // stores={this.store}
              />
            </div>
            <div className="panel border-bottom p30 pb60">
              <SplineCharts chartData={detailChartData} />
            </div>
            <div>
              <Table
                dataSource={detailTableData}
                columns={detailTableColumn}
                locale={{emptyText: '暂无数据'}}
              />
            </div>
          </Col>
          }
          <Col xs={24} sm={24} md={24} lg={5}>
            <InfoCard basicData={this.store.basicInformation} activeId={this.store.activeId}/>
            {/*<div className="panel pt30 pb20 mt20">*/}
              {/*<div className="flex-box">*/}
                {/*<div className="box-item item-left-title ml15">*/}
                  {/*本月运营目标*/}
                  {/*<TargetModal />*/}
                {/*</div>*/}
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