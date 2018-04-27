import React from 'react'
import Iframe from 'react-iframe'
import {observer, inject} from 'mobx-react'
import {Row, Col, Tabs, Tooltip, Input} from 'antd'
import UserCards from '../../components/courier/userCards'
import UserCardsForSales from '../../components/courier/userCardsForSales'
import SaleBasicInformation from '../../components/market/SaleBasicInformation'
import SplineCharts from '../../components/common/highcharts/splineCharts'
// import asce from '../../assets/img/asce.png'
import desc from '../../assets/img/desc.png'
import './userList.less'

const TabPane = Tabs.TabPane;
const Search = Input.Search;

/*注入 stores 的方法*/
@inject("store")
@observer
export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.userListStore = this.props.store.userListStore;
    this.roleStore = this.props.store.roleStore;
  }
  componentDidMount() {
    this.userListStore.getUserList();
  }
  componentWillUnmount() {
    this.userListStore.clear();
  }

  render() {
    const tabList = [{
      tab: <Tooltip overlayClassName="user-list-tab-tooltip" title="最近7天有订单的用户">活跃用户</Tooltip>,
      key: "4"
    },{
      tab: <Tooltip overlayClassName="user-list-tab-tooltip" title="最近7天注册未完成任务的用户">未完成新手任务</Tooltip>,
      key: "1"
    },{
      tab: <Tooltip overlayClassName="user-list-tab-tooltip" title="最近7天注册已完成新手任务的用户">新用户</Tooltip>,
      key: "2"
    },{
      tab: <Tooltip overlayClassName="user-list-tab-tooltip" title="超过7天没有活跃的用户">流失用户</Tooltip>,
      key: "3"
    },{
      tab: "全部",
      key: "0"
    }];
    const tabs = tabList.map((item) => {
      return (
        <TabPane tab={item.tab} key={item.key} />
      )
    });
    const { userListData, activeId, activeUser, onlinePayedStatChartData, expCountStatChartData, isLoading, currentPage, total, pageSize, setTab, setSort, setKey, setPage, setActiveId } = this.userListStore;
    const { role } = this.roleStore;
    return (
      <div className="mt35 container-fluid user-list-wrapper">
        <Row>
          <Col xs={24} lg={18}>
            <div className="user-list-tab">
              {/*<div className="user-list-tab-r">*/}
                {/*<BindUser sbid="" />*/}
              {/*</div>*/}
              <Tabs
                defaultActiveKey="4"
                onChange={setTab}
              >
                {tabs}
              </Tabs>
              <div className="user-cards-wrapper">
                <div className="card-operate mb10">
                  <div className="card-operate-search">
                    <Search
                      onSearch={setKey}
                      enterButton
                    />
                  </div>
                  <div className="card-operate-sort">
                    <div
                      className="sort-bool pointor"
                      onClick={() => {setSort('created')}}
                    >
                      <img src={desc} alt="按注册时间排序" />
                      <span className={this.userListStore.sortStatus === 'created' ? 'active' : ''}>按注册时间排序</span>
                    </div>
                    <div
                      className="sort-bool pointor"
                      onClick={() => {setSort('expcount')}}
                    >
                      <img src={desc} alt="按订单量排序" />
                      <span className={this.userListStore.sortStatus === 'expcount' ? 'active' : ''}>按订单量排序</span>
                    </div>
                  </div>
                </div>
                {
                  role === 2 || role === 3 || role === 4 ?
                    <UserCardsForSales
                      tableData={userListData}
                      activeId={activeId}
                      loading={isLoading}
                      currentPage={currentPage}
                      total={total}
                      defaultPageSize={pageSize}
                      onSelectItem={setActiveId}
                      onSetPage={setPage}
                    /> :
                    <UserCards
                      tableData={userListData}
                      activeId={activeId}
                      loading={isLoading}
                      currentPage={currentPage}
                      total={total}
                      defaultPageSize={pageSize}
                      onSelectItem={setActiveId}
                      onSetPage={setPage}
                    />
                }
              </div>
            </div>
          </Col>
          {
            activeUser &&
            <Col xs={24} lg={6}>
              <SaleBasicInformation
                basicData={activeUser}
                type="2"
              />
              {
                onlinePayedStatChartData && onlinePayedStatChartData.length > 0 &&
                <div className="panel mt20">
                  <div className="order-number">
                    <div className="order-number-title user-panel-title">
                      在线收款
                    </div>
                    <div className="order-number-line p20">
                      <SplineCharts
                        chartData={onlinePayedStatChartData}
                        height="200"
                      />
                    </div>
                  </div>
                </div>
              }
              {
                expCountStatChartData && expCountStatChartData.length > 0 &&
                <div className="panel mt20">
                  <div className="order-number">
                    <div className="order-number-title user-panel-title">
                      订单量
                    </div>
                    <div className="order-number-line p20">
                      <SplineCharts
                        chartData={expCountStatChartData}
                        height="200"
                      />
                    </div>
                  </div>
                </div>
              }
              {
                activeUser.sign &&
                <div className="panel mt20">
                  <div className="user-range">
                    <div className="user-range-title user-panel-title">收派范围</div>
                    <div className="user-range-map">
                      <Iframe
                        url={"https://www.kuaidi100.com/fence/fenceshow.shtml?sign=" + activeUser.sign}
                        width="100%"
                        height="200px"
                        position="relative"
                        id="fenceIframe"
                      />
                    </div>
                  </div>
                </div>
              }
            </Col>
          }
        </Row>
      </div>
    )
  }
}