import {observable, action} from 'mobx'

export class PageStore {
  @observable title = '';

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setTitle = (title) => {
    this.title = title
  };

  @action setTitleByKey = (key) => {
    // console.log('setKey');
    const { menuData } = this.rootStore.roleStore;
    menuData.forEach((menuItem) => {
      if(menuItem.key === key.substring(0, 3) && menuItem.menuItems && menuItem.menuItems.length) {
        menuItem.menuItems.forEach((subMenuItem) => {
          if(key === subMenuItem.key) {
            this.title = subMenuItem.title
          }
        })
      }
    })
  };

  @observable openKeys = [];
  @observable selectedKey = "";

  @action setDefaultKeys(pathname) {
    const { menuData } = this.rootStore.roleStore;
    menuData.forEach((menuItem) => {
      if(menuItem.menuItems && menuItem.menuItems.length) {
        menuItem.menuItems.forEach((subMenuItem) => {
          if(pathname === subMenuItem.link) {
            this.openKeys = [menuItem.key];
            this.selectedKey = subMenuItem.key;
          }
        })
      }
    })
  }
  @action setOpenKey = (key) => {
    let pos = -1;
    this.openKeys.forEach((openKey, index) => {
      if(openKey === key) {
        pos = index;
      }
    });
    if(pos >= 0) {
      this.openKeys.splice(pos, 1);
    } else {
      this.openKeys.push(key);
    }
  };
  @action setSelectedKey = (key) => {
    this.selectedKey = key;
    // console.log(key);
  }
}