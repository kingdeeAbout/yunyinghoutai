/**
 * Created by dadawang on 2018/2/1.
 */
import React from 'react'
import { observer, inject } from 'mobx-react';
import { Menu, Dropdown, Badge, Icon } from 'antd';
import Cookies from 'js-cookie';
import history from '../history'
import './header.less'
import Tips from '../assets/img/tips.png'

@inject("store")
@observer
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.roleStore = props.store.roleStore;
    this.pageStore = props.store.pageStore;
  }

  handleLogout() {
    Cookies.remove('CRMTOKEN', { path: '/' });
    history.replace('/page/login');
    // window.location.reload();
  };

  render() {
    const userName = this.roleStore.userInfo ? this.roleStore.userInfo.nickname : '';
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleLogout}>注销</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header clearfloat">
        <div className="header-left mt20 ml20">{this.pageStore.title}</div>
        <div className="header-right mt20 mr15">
          <Badge>
            <img className="mr10" src={Tips} alt="tips" />
          </Badge>
          <Dropdown overlay={menu} placement="bottomRight">
            <a className="ant-dropdown-link">
              <span className="login-name">您好</span>
              {
                userName &&
                <span className="login-name">，{userName}</span>
              }<Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}
