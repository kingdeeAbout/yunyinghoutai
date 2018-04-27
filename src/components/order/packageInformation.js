/**
 * Created by Administrator on 2018/4/19.
 */
import React from 'react'
import './pakageInformation.less'

export default class SaleBasicInformation extends React.Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const information = this.props.basicData;

    return (
      <div className="pakage-basic-wrapper panel">
        <div className="basic-title">包裹信息</div>
        <div className="basic-content">
          <div><label>订单编号:</label><span>{information.kuaidiNum}</span></div>
          <div><label>寄件时间:</label><span>{information.created}</span></div>
          <div><label>寄&ensp;件&ensp;人:</label><span>{information.sendName}&ensp;{information.sendMobile}&ensp;{information.sendaddr2}</span></div>
          <div><label>收&ensp;件&ensp;人:</label><span>{information.recName}&ensp;{information.recMobile}&ensp;{information.recaddr2}</span></div>
          <div><label>物品名称:</label><span>{information.cargo}</span></div>
          <div><label>所属门店:</label><span>{information.mktName}</span></div>
          <div><label>重&emsp;&emsp;量:</label><span>{information.weight}</span></div>
          <div><label>包裹件数:</label><span>{information.pkgCount}</span></div>
          <div><label>快递费用:</label><span>{information.freight}</span></div>
          <div><label>保价服务:</label><span>{information.values}</span></div>
          <div><label>取件地址:</label><span>{information.gotAddr}</span></div>
        </div>
      </div>
    )
  }
}