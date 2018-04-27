
import React from 'react'
import {observer, inject} from 'mobx-react'
import {Row, Col, Table} from 'antd'
import SplineCharts from '../../components/common/highcharts/splineCharts'
// import SolidGaugeCharts from "../../components/common/highcharts/solidgaugeCharts"
import Cards from '../../components/project/cards'
import CardTabs from '../../components/market/cardTabs'
import ProjectInfoCard from '../../components/project/info'
import Breadcrumb from '../../components/common/breadcrumb'
import BindUser from '../../components/courier/bindUser'
// import TargetModal from '../../components/common/modal/target'

@inject("store")
@observer
class ProjectBreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.projectStore = props.store.projectStore;
  }

  render() {
    const { breadcrumbData } = this.projectStore;
    return (
      <Breadcrumb breadcrumbData={breadcrumbData} selectItem={this.projectStore.gotoBreadcrumb} />
    )
  }
}

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
        <div className="border-bottom">
          <CardTabs
            listData={tabData}
            activeId={activeTabId}
            selectTab={setActiveTab}
          />
        </div>
        <div className="border-bottom p30 pb60">
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
//
// @inject("store")
// @observer
// class StatPanel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.operatingStore = props.store.operatingStore;
//   }
//
//   render() {
//     const { projectStatData } = this.operatingStore;
//     return (
//       <div className="panel p30">
//         <Row>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline">
//               <div className="box-spline-num">{projectStatData ? projectStatData.onlinePayed : 0}</div>
//               <div className="box-spline-title">今日收款</div>
//             </div>
//           </Col>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline">
//               <div className="box-spline-num">{projectStatData ? projectStatData.expCount : 0}</div>
//               <div className="box-spline-title">今日订单量</div>
//             </div>
//           </Col>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline ">
//               <div className="box-spline-num">{projectStatData ? projectStatData.newMarkets : 0}</div>
//               <div className="box-spline-title">今日新用户</div>
//             </div>
//           </Col>
//           <Col xs={12} sm={12} md={6} lg={24}>
//             <div className="box-spline">
//               <div className="box-spline-num">{projectStatData ? projectStatData.activeMarkets : 0}</div>
//               <div className="box-spline-title">今日活跃用户</div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     )
//   }
// }

/*注入 stores 的方法*/
@inject("store")
@observer
export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.projectStore = props.store.projectStore;
    this.type = "3";
  }

  componentDidMount() {
    this.projectStore.addBreadcrumb('', '全部');
    this.projectStore.getProjectList({});
  }

  componentWillUnmount() {
    this.projectStore.clear();
  }

  handleCardsOpenClick = (e, sbid, name) => {
    console.log('addBreadcrumb:', sbid);
    e.stopPropagation();
    this.type = "4";
    this.projectStore.getNextLevelProjectList(sbid, name);
  }

  render() {
    const { projectData, activeId, activeProject, setActiveId } = this.projectStore;

    return (
      <div className="mt35 container-fluid">
        <Row>
          <ProjectBreadCrumb />
        </Row>
        <Row>
          <Col xs={24} lg={8} xxl={5}>
            <div>
              <Cards
                listData={projectData}
                activeId={activeId}
                selectItem={setActiveId}
                openItem={this.handleCardsOpenClick}
              />
            </div>
          </Col>
          <Col xs={24} lg={16} xxl={14}>
            {
              activeProject &&
              <div className="panel border-bottom hidden-xxl">
                <ProjectInfoCard
                  basicData={activeProject}
                  size="large"
                  type={this.type}
                  needEdit={true}
                />
              </div>
            }
            <div className="panel">
              <CourierStatPanel />
            </div>
          </Col>
          {
            activeProject &&
            <Col xs={0} lg={0} xxl={5}>
              <div className="panel">
                <ProjectInfoCard
                  basicData={activeProject}
                  type={this.type}
                  needEdit={true}
                />
              </div>
              {/*<div className="panel mt20">*/}
                {/*<StatPanel />*/}
              {/*</div>*/}
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
          }
        </Row>
      </div>
    )
  }
}