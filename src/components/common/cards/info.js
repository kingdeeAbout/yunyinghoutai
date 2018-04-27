
import React from 'react'
import {observer, inject} from 'mobx-react'
import history from  '../../../history'
import BindUser from '../../courier/bindUser'
import UpdateInfo from '../../project/updateInfo'
import './info.less'

@inject("store")
@observer
export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store.roleStore;
  }

  operateNotes = () => {
    const { activeId, type } = this.props;
    history.push({pathname: '/page/marketing/notes', state: {activeId: activeId, type:type}})
  };

  render() {
    const { size, needEdit } = this.props;
    if(size && size === 'large') {
      return (
        <div className="sale-manage-basic-wrapper">
          <div className="basic-info">
            <div className="basic-info-work">
              <span className="basic-info-name">{this.props.name}<span className="basic-info-subname">（{this.props.subname} {this.props.tel}）</span></span>
            </div>
            { needEdit &&
            <div className="basic-info-modify">
              <UpdateInfo
                modalData={this.props.modalData}
                activeId={this.props.activeId}
              />
            </div>
            }
          </div>
          {/* TODO 后台暂无接口字段*/}
          {/*<div className="basic-address">{this.props.desc}</div>*/}
          <div className="basic-heap">
            <div className="basic-heap-l">
              <span className="basic-heap-num">{this.props.usersCount}</span>
              <span className="basic-heap-text">个累积用户</span>
            </div>
          </div>
          <div className="basic-operate">
            <div className="basic-operate-memo">
              <a onClick={this.operateNotes}>{this.props.noteNum ? this.props.noteNum : 0}条备忘录</a>
              <span className="basic-operate-split" />
              <a onClick={this.operateNotes}>新增</a>
            </div>
            <BindUser
              className="fr"
              sbid={this.props.sbid}
            />
          </div>
        </div>
      )
    }else {
      return (
        <div className="sale-manage-basic-wrapper">
          <div className="basic-info">
            <div className="basic-info-work">
              <span className="basic-info-name">{this.props.name}</span>
              <span className="basic-info-post pl20">{this.props.subname}</span>
            </div>
            { needEdit &&
            <div className="basic-info-modify">
              <UpdateInfo
                modalData={this.props.modalData}
                activeId={this.props.activeId}
              />
            </div>
            }
          </div>
          <div className="basic-mobile">{this.props.tel}</div>
          {/* TODO 后台暂无接口字段*/}
          {/*<div className="basic-address">{this.props.desc}</div>*/}
          <div className="basic-heap">
            <div className="basic-heap-l">
              <span className="basic-heap-num">{this.props.usersCount}</span>
              <span className="basic-heap-text">个累积用户</span>
            </div>
            <BindUser
              className="basic-heap-r"
              sbid={this.props.sbid}
            />
          </div>
          <div className="basic-operate border-top pt20">
            <div className="basic-operate-memo">
              <a onClick={this.operateNotes}>{this.props.noteNum ? this.props.noteNum : 0}条备忘录</a>
            </div>
            <div>
              <a onClick={this.operateNotes}>新增</a>
            </div>
          </div>
        </div>
      )
    }
  }
}

