
import {observable, action, computed} from 'mobx'
import systemMenu from '../json/menu.json'
import UserApi from '../api/userApi'

const api = new UserApi();

export class RoleStore {
  @observable userData;

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get userInfo() {
    return JSON.parse(localStorage.getItem("user_info"));
  }

  @computed get role() {
    if(this.userInfo && this.userInfo.roles && this.userInfo.roles.length > 0){
      //1：超级管理员
      //2：销售主管
      //3：销售人员
      //4：项目负责人
      return this.userInfo.roles[0].id;
    } else {
      return '';
    }
  }

  @action getUserData = (callback) => {
    api.getUserData().then((data) => {
      if(data.status === "200" && data.data && data.data.length > 0){
        this.userData = data.data[0];
        typeof(callback) === "function" && callback();
      }
    });
  };

  @computed get menuData() {
    const systemMenuItems = systemMenu;
    const userMenuItems = this.userData ? this.userData.menuItems : [];
    return userMenuItems.map((item) => {
      let menuItem = null;
      systemMenuItems.forEach((systemItem) => {
        if(item.code === systemItem.key){
          menuItem = {
            key: systemItem.key,
            title:  systemItem.title,
            xlinkHrefActive: systemItem.xlinkHrefActive,
            xlinkHref: systemItem.xlinkHref
          };
          if(item.children){
            menuItem.menuItems = item.children.map((subItem) => {
              let subMenuItem = null;
              systemItem.menuItems.forEach((systemSubItem) => {
                if(subItem.code === systemSubItem.key){
                  subMenuItem = systemSubItem;
                }
              });
              return subMenuItem;
            })
          }
        }
      });
      return menuItem;
    })
  }
}