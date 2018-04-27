/**
 * Created by dadawang on 2018/2/6.
 */
import {observable, action} from 'mobx'
import { message } from 'antd';
import UserListApi from '../api/userListApi'
import CommonApi from '../api/commonApi'
import company from '../json/company.json'
import history from '../history'

const api = new UserListApi();
const commonApi = new CommonApi();

export class BindUserStore {
  @observable visible = false;   // modal框

  @observable unRegMoblie = []; // 按手机号添加 bindUserMobile
  @observable validMobileNum;

  allCompany = company;
  @observable city = [];    // 按地区添加 bindUserArea
  @observable selectCity = [];
  @observable selectCompany = [];

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  clear() {
    this.unRegMoblie = [];
    this.validMobileNum = 0;

    this.city = [];
    this.selectCity = [];
    this.selectCompany = [];
  };

  @action showModal = () => {
    this.visible = true
  };

  @action hideModal = () => {
    this.visible = false;
    this.clear();
  };

  @action onSetTab = () => {
    this.clear();
  };

  addMobilePromise(mobile, sbid) {
    const role = this.rootStore.roleStore.role;
    if(sbid) {
      return api.addProjectMobileUser({mobiles: mobile, sbid: sbid});
    }
    if (role && (role === 1 || role === 4)) {
      return api.addProjectMobileUser({mobiles: mobile});
    }
    return api.addMobile({mobiles: mobile});
  }

  // 按手机号添加 返回未注册手机号
  @action addMobile = (mobile, sbid) => {
    this.addMobilePromise(mobile, sbid).then((data) => {
      if (data.status === '200') {
        this.unRegMoblie = data.data ? data.data : [];
        if(data.data1 > 0) {
          this.validMobileNum = data.data1;
          message.success("绑定成功");
          if(this.unRegMoblie.length === 0) {
            this.hideModal();
            if(history.location.pathname !== '/page/courier/userList') {
              history.push('/page/courier/userList');
            }
          }
        }else{
          message.error("绑定失败，找不到已注册快递员");
        }
      } else {
        message.error(data.message);
      }
    });
  };

  @action addAreaUser = (sbid) => {
    api.addProjectAreaUser({
      kuaidicoms: this.selectCompany.join(','),
      aids: this.selectCity.join(','),
      sbid: sbid
    }).then((data) => {
      if (data.status === '200') {
        if(data.data && data.data.length > 0) {
          message.success("绑定成功");
          this.hideModal();
          if(history.location.pathname !== '/page/courier/userList') {
            history.push('/page/courier/userList');
          }
        }else{
          message.error("绑定失败，找不到已注册快递员");
        }
      } else {
        message.error(data.message);
      }
    });
  };

  @action getAreaCity = (code) => {     // 获取省下面的市
    commonApi.getChilds(code[code.length - 1]).then((data) => {
      this.city = data.data;
      this.selectCity = [];
    });
  };

  @action handleClickCompany = (e, code) => {  // 点击选中市
    let companyIndex = this.selectCompany.indexOf(code);
    if (companyIndex === -1) {
      this.selectCompany.push(code);
      console.log("selectCompany", this.selectCompany)
    } else {
      this.selectCompany.splice(companyIndex, 1);
      console.log("selectCompany", this.selectCompany)
    }
  };

  @action handleClickCity = (e, code) => {  // 点击选中市
    let cityIndex = this.selectCity.indexOf(code);
    if (cityIndex === -1) {
      this.selectCity.push(code);
      console.log("selectCity", this.selectCity)
    } else {
      this.selectCity.splice(cityIndex, 1);
      console.log("selectCity", this.selectCity)
    }
  };

  @action onChangeExpressAll = (e) =>{             // 选择全部快递公司
    // console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      this.selectCompany = this.allCompany.map((item) => {
        return item.number
      });
    } else {
      this.selectCompany = []
    }
  };

  @action onChangeAreaAll = (e) =>{                  // 选择全部城市
    // console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      this.selectCity = this.city.map((item) => {
        return item.code
      });
    } else {
      this.selectCity = []
    }
  };
}