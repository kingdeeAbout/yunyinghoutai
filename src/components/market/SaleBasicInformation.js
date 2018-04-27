/**
 * Created by Administrator on 2018/3/7.
 */
import React from 'react'
import history from  '../../history'
import './SaleBasicInformation.less'

export default class SaleBasicInformation extends React.Component {

  operateNotes = () => {
    const activeId = this.props.basicData.id;
    // type（必须）：备忘录的类型。1销售人员备忘录，2店铺，3项目
    const type = this.props.type;
    history.push({pathname: '/page/marketing/notes',state: {activeId: activeId, type: type}})
    // console.log("history", history)
  };

  render() {
    const information = this.props.basicData;
    // console.log(information);
    const sentComs = information.sentComs;
    const logos = sentComs.map((item, index) => {
      return (
        <img
          src={"https://cdn.kuaidi100.com/images/all/56/" + item.kuaidiCom + ".png"}
          alt={item.kuaidiCom}
          key={index}
        />
      )
    });

    return (
      <div className="basic-wrapper panel">
        <div className="basic-title">基本资料</div>
        <div className="basic-info">
          <div className="basic-info-name">
            <span className="mr10">{information.workerName ? information.workerName : ''}</span><span>({information.mktName ? information.mktName : ''})</span>
          </div>
          {/*<div className="basic-info-task">新手任务({(!information.newbieTask || information.newbieTask === null) ? '-': information.newbieTask})</div>*/}
        </div>
        <div className="basic-mobile">{(!information.phone || information.phone === null) ? '-': information.phone}</div>
        <div className="basic-address">{(!information.address || information.address === null) ? '-': information.address}</div>
        <div className="basic-logo">
          {logos}
        </div>
        <div className="basic-operate border-top">
          <div className="basic-operate-memo">
            <a onClick={this.operateNotes}>{information.noteNum ? information.noteNum : 0}条备忘录</a>
          </div>
          <div>
            <a onClick={this.operateNotes}>新增</a>
          </div>
        </div>
      </div>
    )
  }
}