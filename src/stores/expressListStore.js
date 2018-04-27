/**
 * Created by Administrator on 2018/4/19.
 */
import {observable, action, computed} from 'mobx'
import { message } from 'antd';
import OrderApi from '../api/orderApi'

const api = new OrderApi();

export class ExpressListStore {
  @observable isLoading = false;
  @observable activeId;
  @observable userList = observable.map();
  @observable package = {};
  @observable tranport = [];

  // filter
  @observable tabId;          // 数据类型
  @observable timeQueryType; // 寄件时间
  @observable kuaidiCom;         // 订单来源
  @observable kuaidiNum;      // 快递单号
  @observable workerKey;      // 快递员

  @observable currentPage = 1;          // 分页
  @observable pageSize = 10;
  @observable total;
  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  clear() {
    this.total = 0;
    this.currentPage = 1;
    this.timeQueryType;
    this.kuaidiCom;
    this.kuaidiNum = "";
    this.workerKey = "";
    this.userList.clear();
    this.package = {};
    this.tranport = [];
  };

  @computed get userListData() {
    return this.userList.values();
  }

  // @computed get tranportData() {
  //   return this.tranport;
  // }

  @computed get packageData() {
    return this.package;
  }

  @action setActiveId = (id) => {    // 表格点击返回id 回调
    // console.log("activeId:", id);
    this.activeId = id;
  };

  @action setActiveId = (id) => {
    // console.log("activeId:", id);
    this.activeId = id;
    this.getPackageData(id);
    this.getTranportData(id);
    // 包裹信息
  };


  @action setPage = (page) => {     // 分页
    // console.log(page, pageSize);
    this.currentPage = page;
    this.getOrderListData();
  };

  @action onChangeOrderType = (event) => {      // 数据类型
    // console.log(event.target.value);
    this.tabId = event.target.value;
    this.currentPage = 1;
    if (this.kuaidiNum || this.workerKey) {
      this.getOrderListData();
    } else {
      message.info("请输入快递单号或快递员姓名、手机号")
    }
  };

  @action onChangeDate = (event) => {        //寄件时间
    // console.log(event);
    this.timeQueryType = event.target.value;
    this.currentPage = 1;
    if (this.kuaidiNum || this.workerKey) {
      this.getOrderListData();
    } else {
      message.info("请输入快递单号或快递员姓名、手机号")
    }
  };

  @action orderSource = (value, option) => {    // 订单来源
    // console.log(value, option);
    this.kuaidiCom = value;
    this.currentPage = 1;
    if (this.kuaidiNum || this.workerKey) {
      this.getOrderListData();
    } else {
      message.info("请输入快递单号或快递员姓名、手机号")
    }
  };

  @action onChangeOrder = (event) => {          // 快递单号
    this.kuaidiNum = event.target.value;
  };

  @action onChangeCurior = (event) => {       // 快递员
    this.workerKey = event.target.value;
  };

  @action searchOrder = (value) => {          // 快递单号
    this.kuaidiNum = value;
    this.currentPage = 1;
    this.getOrderListData();
  };

  @action searchCurior = (value) => {       // 快递员
    this.workerKey = value;
    this.currentPage = 1;
    this.getOrderListData();
  };

  // 表格
  @action getOrderListData = () => {
    this.isLoading = true;
    this.userList.clear();
    const data = {
      tabId: this.tabId,     // 数据类型
      timeQueryType: this.timeQueryType,
      kuaidiCom: this.kuaidiCom,
      kuaidiNum: this.kuaidiNum,
      workerKey: this.workerKey,
      offset: (this.currentPage - 1) * this.pageSize,
      limit: this.pageSize
    };
    api.getOrderListData(data).then((data) => {
      if (data.status === "200") {
        this.isLoading = false;
        if (data.data && data.data.length > 0) {
          data.data.forEach((user) => {
            user.key = user.id;
            // user.created = format.formatDateToString(new Date(user.created), "yyyy-MM-dd");
            this.userList.set(user.id, user);
          });
          this.total = data.total;
          this.setActiveId(data.data[0].id);
        }else {
          this.total = 0;
        }
      } else {
        this.total = 0;
        message.error(data.message);
        this.isLoading = false;
      }
    })
  }

  // 包裹信息
  @action getPackageData = (id) => {
    api.getPackageData({expid: id}).then((data) => {
      if (data.status === "200") {
        this.package = data.data;
      } else {
        message.error(data.message);
      }
    })
  }

  // 物流信息
  @action getTranportData = (id) => {
    api.getTranportData({expid: id}).then((data) => {
      if (data.status === "200") {
        if (data.data) {
          this.tranport = data.data.lastResult.data;
        }
      } else {
        message.error(data.message);
      }
    })
  }

}