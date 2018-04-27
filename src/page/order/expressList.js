/**
 * Created by Administrator on 2018/4/19.
 */
import React from 'react'
import {observer, inject} from 'mobx-react';
import './expressList.less'
import {Row, Col, Tabs, Radio, Select, Input, Steps } from 'antd'
import UserCards from '../../components/order/userCards'
import PakageInformation from '../../components/order/packageInformation'

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Search = Input.Search;
const Step = Steps.Step;

/*注入 stores 的方法*/
@inject("store")
@observer
class TransportStatus extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    const tranportData = this.props.basicData;
    // console.log("tranportData",tranportData)
    const tranportTime = tranportData.map((item, index) => {
      return (
        <div key={item.ftime} className="tranportTime">{item.time}</div>
      )
    });

    const tranportAddr= tranportData.map((item, index) => {
      return (
        <Step title={<div>{item.context}</div>} status={item.status == "签收" ? "finish" : "process"} description={<div>{item.status}</div>} key={item.ftime} icon={item.status !== "签收" ? "up-circle-o" : ""}/>
      )
    });

    return(
      <div className="transport-status-wrapper panel mt20">
        <div className="basic-title">最新物流状态</div>
        <div className="ml10">
          <Row>
            <Col xs={6} lg={6}>
              {
                tranportTime
              }
            </Col>
            <Col xs={18} lg={18}>
              <Steps direction="vertical" size="small" current={1}>
                {
                  tranportAddr
                }
                {/*<Step title={<div>【广州市】顺丰速运。</div>} status="finish" description={<div>已收取快件</div>}/>*/}
                {/*<Step title={<div>【广州市】顺丰速运。</div>} status="process" description={<div>已收取快件</div>} icon="up-circle-o"/>*/}
                {/*<Step title={<div>【广州市】顺丰速运。</div>} status="wait" description={<div>已收取快件</div>} icon="up-circle-o"/>*/}
              </Steps>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}


/*注入 stores 的方法*/
@inject("store")
@observer
export default class ExpressList extends React.Component {
  constructor(props) {
    super(props);
    this.expressListStore = props.store.expressListStore;

    // this.operatingStore = props.store.operatingStore;
  }
  componentDidMount() {
    // this.expressListStore.getOrderListData();
    this.expressListStore.clear();
  }
  componentWillUnmount() {
    // 定时器或添加的事件监听器 数据不起作用
  }
  callback = (key) => {
    console.log(key);
  }
  render() {
    const { onChangeOrderType, onChangeDate, orderSource, searchOrder, searchCurior, onChangeOrder, onChangeCurior, isLoading, userListData, total, currentPage, pageSize, activeId, setActiveId, setPage, packageData, tranport} = this.expressListStore;

    return (
      <div className="mt35 container-fluid express-list-wrapper">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xxl={18}>
            <div className="left">
              <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="快递单列表" key="1"></TabPane>
              </Tabs>
              <Row className="mb10 my-ant-radio">
                <Col xs={24} xxl={12}>
                  <label>数据类型:</label>
                  <RadioGroup onChange={onChangeOrderType}>
                    <RadioButton value="PRINTWAIT">待打印</RadioButton>
                    <RadioButton value="GOTWAIT">待取件</RadioButton>
                    <RadioButton value="SENTGOT">已取件</RadioButton>
                    <RadioButton value="CANCEL">已取消</RadioButton>
                  </RadioGroup>
                </Col>
                <Col xs={24} xxl={12} >
                  <label>寄件时间:</label>
                  <RadioGroup onChange={onChangeDate}>
                    <RadioButton value="4">今天</RadioButton>
                    <RadioButton value="5">昨天</RadioButton>
                    <RadioButton value="6">最近一个月</RadioButton>
                  </RadioGroup>
                </Col>
              </Row>
              <Row className="mb10">
                <Col xs={24} lg={24}>
                  <label>订单来源:</label>
                  <Select placeholder="请选择" defaultValue="" style={{ width: 340 }} className="ml10" onSelect={orderSource}>
                    <Option value="">全部</Option>
                    <Option value="shunfeng">顺丰</Option>
                    <Option value="yuantong">圆通</Option>
                    <Option value="huitongkuaidi">百世</Option>
                    <Option value="ems">EMS</Option>
                    <Option value="youzhengguonei">邮政</Option>
                    <Option value="annengwuliu">安能</Option>
                    <Option value="jd">京东</Option>
                    <Option value="youshuwuliu">优速</Option>
                    <Option value="zhongtong">中通</Option>
                    <Option value="shentong">申通</Option>
                    <Option value="yunda">韵达</Option>
                    <Option value="debangwuliu">德邦</Option>
                    <Option value="guotongkuaidi">国通</Option>
                    <Option value="tiandihuayu">天地华宇</Option>
                    <Option value="tiantian">天天</Option>
                    <Option value="kuaijiesudi">快捷</Option>
                    <Option value="kuayue">跨越</Option>
                    <Option value="dhl">DHL</Option>
                    <Option value="tnt">TNT</Option>
                    <Option value="ups">UPS</Option>
                    <Option value="fedex">Fedex</Option>
                  </Select>
                </Col>
              </Row>
              <Row className="mb10">
                <Col xs={24} xxl={12}>
                  <label>快递单号:</label>
                  <Search
                    placeholder="支持快递单号精准查询"
                    style={{ width: 340 }}
                    className="ml10"
                    onChange={onChangeOrder}
                    onSearch={searchOrder}
                    enterButton
                  />
                </Col>
                <Col xs={24} xxl={12}>
                  <label>快递员:</label>
                  <Search
                    placeholder="支持快递员姓名、快递员手机精准查询"
                    style={{ width: 340 }}
                    className="ml24"
                    onChange={onChangeCurior}
                    onSearch={searchCurior}
                    enterButton
                  />
                </Col>
              </Row>
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
            </div>
          </Col>
          <Col xs={24} sm={24}  md={24} lg={24} xxl={6}>
            <div className="right">
              { userListData.length > 0 ?
                <PakageInformation
                  basicData={packageData}
                ></PakageInformation> : null
              }
              { userListData.length > 0 ?
                <TransportStatus
                  basicData={tranport}
                ></TransportStatus> : null
              }
            </div>
            {/*{ userListData && userListData.length > 0 &&*/}
              {/*<PakageInformation*/}
                  {/*basicData={packageData}*/}
                {/*></PakageInformation> &&*/}
              {/*<TransportStatus></TransportStatus>*/}
            {/*}*/}
          </Col>
        </Row>
      </div>
    )
  }
}