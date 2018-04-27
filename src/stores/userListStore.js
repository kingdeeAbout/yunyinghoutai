/**
 * Created by dadawang on 2018/2/6.
 */
import {observable, action, computed} from 'mobx'
import { message } from 'antd';
import UserListApi from '../api/userListApi'
import Format from '../libs/format'

const api = new UserListApi();
const format = new Format();

export class UserListStore {
  @observable isLoading = false;
  @observable activeId;
  @observable userList = observable.map();
  @observable marketStatList = observable.map();

  @observable tabStatus = 4;
  @observable sortStatus = "created";
  @observable queryKey = "";      // 搜索
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
    this.queryKey = "";
    this.tabStatus = 4;
    this.sortStatus = "created";
    this.userList.clear();
    this.marketStatList.clear();
  };

  @action setActiveId = (id) => {
    console.log("activeId:", id);
    this.activeId = id;
    this.getMarketMonthlyStat(id);
  };

  @action setTab = (tab) => {     // tab变换
    // this.queryKey = "";
    this.tabStatus = tab;
    this.currentPage = 1;
    this.getUserList();
  };

  @action setSort = (sort) => {     // 排序变换
    // this.queryKey = "";
    this.sortStatus = sort;
    this.currentPage = 1;
    this.getUserList();
  };

  @action setPage = (page) => {     // 分页
    // console.log(page, pageSize);
    this.currentPage = page;
    this.getUserList();
  };

  @action setKey = (key) => {      // 搜索框handle
    // console.log(value);
    this.queryKey = key;
    this.currentPage = 1;
    this.getUserList();
  };

  @computed get activeUser() {
    return this.userList.get(this.activeId);
  }

  @computed get userListData() {
    return this.userList.values();
  }

  @computed get expCountStatChartData() {
    const marketStatList = this.marketStatList.values();
    if (marketStatList && marketStatList.length > 0){
      const marketStatData = marketStatList.map((item) => {
        const date = new Date(item.statDate);
        return [date.getTime(), item.expCount]
      });
      return [{
        name: '统计',
        data: marketStatData
      }]
    }
    else
      return []
  }

  @computed get onlinePayedStatChartData() {
    const marketStatList = this.marketStatList.values();
    if (marketStatList && marketStatList.length > 0){
      const marketStatData = marketStatList.map((item) => {
        const date = new Date(item.statDate);
        return [date.getTime(), item.onlinePayed]
      });
      return [{
        name: '统计',
        data: marketStatData
      }]
    }
    else
      return []
  }

  getUserListPromise() {
    const role = this.rootStore.roleStore.role;
    const data = {
      mktStatus: this.tabStatus,
      sort: this.sortStatus,
      queryKey: this.queryKey,
      offset: (this.currentPage - 1) * this.pageSize,
      limit: this.pageSize
    };
    if(role && role === 1) return api.getManagerUserList(data);
    if(role && role === 4) return api.getProjectUserList(data);
    return api.getUserList(data);
  }

  // 表格数据请求
  @action getUserList = () => {
    this.isLoading = true;
    this.userList.clear();
    this.getUserListPromise().then((data) => {
      this.isLoading = false;
      if (data.status === '200') {
        if (data.data && data.data.length > 0) {
          data.data.forEach((user) => {
            user.key = user.id;
            user.created = format.formatDateToString(new Date(user.created), "yyyy-MM-dd");
            this.userList.set(user.id, user);
          });
          // console.log(this.userList.values())
          this.total = data.total;
          this.setActiveId(data.data[0].id);

          // this.basicInforData(this.activeId);
        } else {
          this.total = 0;
        }
      } else {
        this.total = 0;
        message.error(data.message);
      }
    });
    // .finally(action(() => { this.isLoading = false; }));
  };

  @action getMarketMonthlyStat = (id) => {
    const data = {
      mktid: id
    };
    this.marketStatList.clear();
    api.getMarketMonthlyStat(data).then((data) => {
      if (data.status === '200') {
        if (data.data && data.data.length > 0) {
          data.data.forEach((item) => {
            this.marketStatList.set(item.statDate, item);
          });
        }
      } else {
        message.error(data.message);
      }
    });
  }
}