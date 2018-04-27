/**
 * Created by Administrator on 2018/3/7.
 */
import React from 'react'
import {observer, inject} from 'mobx-react'
import { Modal, Button, Tabs } from 'antd';
import "../common/modal/modal.less"
import "./bindUser.less"
import BindUserMobile from "./bindUserMobile"
// import BindUserArea from "./bindUserArea"

const TabPane = Tabs.TabPane;

@inject("store")
@observer
export default class BindUser extends React.Component {
  constructor(props) {
    super(props);
    this.bindUserStore = this.props.store.bindUserStore;
  }

  componentWillUnmount() {
    this.bindUserStore.clear();
  }

  render() {
    const { sbid } = this.props;
    const { visible, showModal, hideModal, onSetTab } = this.bindUserStore;

    return (
      <div className="bind-user-wrapper">
        <Button type="primary" className="btn-bind-user" onClick={showModal}>绑定新快递员</Button>
        <Modal visible={visible}
               onCancel={hideModal}
               footer={null}
        >
          <Tabs defaultActiveKey="1" onChange={onSetTab}>
            <TabPane tab="按手机号码添加" key="1">
              <BindUserMobile sbid={sbid} />
            </TabPane>
            {/*<TabPane tab="按地区添加" key="2">*/}
              {/*<BindUserArea sbid={sbid} />*/}
            {/*</TabPane>*/}
          </Tabs>
        </Modal>
      </div>
    )
  }
}