/**
 * Created by dadawang on 2018/2/1.
 */
import React from 'react';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom'
import {Layout, Menu} from 'antd';
import './leftMenu.less'
import Logo from '../assets/img/logo.png'

const SubMenu = Menu.SubMenu;
const {Sider} = Layout;

@inject("store")
@observer
export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.roleStore = props.store.roleStore;
    this.pageStore = props.store.pageStore;
  }

  componentDidMount() {
    const { menuData } = this.roleStore;
    if(!menuData.length){
      this.roleStore.getUserData(() => {
        this.pageStore.setDefaultKeys(this.props.pathname);
      });
    } else {
      this.pageStore.setDefaultKeys(this.props.pathname);
    }
  }

  componentDidUpdate() {
    const selectedKey = this.pageStore.selectedKey;
    if(selectedKey){
      this.pageStore.setTitleByKey(selectedKey);
    }
  }

  render() {
    const { menuData } = this.roleStore;
    const { openKeys, selectedKey, setOpenKey, setSelectedKey } = this.pageStore;
    // console.log('openKeys:', openKeys);
    // console.log('selectedKey:', selectedKey);

    const subMenu = menuData.map((item) => {
      const menuItems = item.menuItems.map((item) => {
        return (
          item &&
          <Menu.Item key={item.key}>
            <Link to={item.link}>{item.title}</Link>
          </Menu.Item>
        )
      });
      return (
        item &&
        <SubMenu
          onTitleClick={(e) => {setOpenKey(e.key)}}
          key={item.key}
          title={
            <span>
              {
                (selectedKey.includes(item.key)) ?
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref={item.xlinkHrefActive} />
                </svg>
                  :
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref={item.xlinkHref} />
                </svg>
              }
              <span>{item.title}</span>
            </span>
          }
        >
          {menuItems}
        </SubMenu>
      )
    });
    return (
      <Sider
        className="sider"
        width={160}
        breakpoint="xs"
        collapsedWidth="0"
      >
        <div>
          <img src={Logo} alt="快递100" className="img-menu" />
        </div>
        {
          <Menu
            className="menu"
            onClick={(e) => {setSelectedKey(e.key)}}
            openKeys={openKeys.toJS()}
            selectedKeys={[selectedKey]}
            mode="inline"
          >
            {subMenu}
          </Menu>
        }
      </Sider>
    );
  }
}
