
import {observable, action, computed} from 'mobx'
import { message } from 'antd';
import ProjectApi from '../api/projectApi'
import MarketingApi from '../api/marketingApi'

const projectApi = new ProjectApi();
const marketingApi = new MarketingApi();

export class CourierStore {
  @observable activeTabId;
  @observable isLoading = false;
  @observable courierTabData = observable.map();
  @observable courierListData = observable.map();
  @observable activeId;

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  clear () {
    this.activeTabId = "";
    this.activeId = "";
    this.courierTabData.clear();
    this.courierListData.clear();
  };

  @action setActiveTab = (id) => {
    this.activeTabId = id;
  };

  courierDataParam = {
    'statDate': '日期',
    'newMarkets': '新用户',
    'activeMarkets': '活跃快递员',
    'expCount': '订单量',
    'onlinePayed': '在线支付金额',
    'activeRate': '活跃度',
    'gotRate': '取件率'
  };

  @computed get courierTableColumn() {
    const role = this.rootStore.roleStore.role;
    if(role === 2 || role === 3 || role === 4) {
      // 项目管理员、销售
      return [
        {title: this.courierDataParam['statDate'], dataIndex: 'statDate', key: 'statDate'},
        {title: this.courierDataParam['newMarkets'], dataIndex: 'newMarkets', key: 'newMarkets'},
        {title: this.courierDataParam['expCount'], dataIndex: 'expCount', key: 'expCount'},
        {title: this.courierDataParam['onlinePayed'], dataIndex: 'onlinePayed', key: 'onlinePayed'},
        {title: this.courierDataParam['gotRate'], dataIndex: 'gotRate', key: 'gotRate'}
      ]
    } else {
      return [
        {title: this.courierDataParam['statDate'], dataIndex: 'statDate', key: 'statDate'},
        {title: this.courierDataParam['newMarkets'], dataIndex: 'newMarkets', key: 'newMarkets'},
        {title: this.courierDataParam['activeMarkets'], dataIndex: 'activeMarkets', key: 'activeMarkets'},
        {title: this.courierDataParam['expCount'], dataIndex: 'expCount', key: 'expCount'},
        {title: this.courierDataParam['onlinePayed'], dataIndex: 'onlinePayed', key: 'onlinePayed'},
        {title: this.courierDataParam['activeRate'], dataIndex: 'activeRate', key: 'activeRate'}
      ]
    }
  }

  @action setCourierTabData(data) {
    const role = this.rootStore.roleStore.role;
    this.courierTabData.set('newMarkets', {
      id: 'newMarkets',
      number: data.newMarkets,
      title: this.courierDataParam['newMarkets'],
      percent: data.newMarketsIncrease,
      status: data.newMarketsIncrease ? (data.newMarketsIncrease.indexOf("-") >= 0 ? 0 : 1) : 1
    });
    if(role !== 2 && role !== 3 && role !== 4) {
      // 活跃用户（超级管理员）
      this.courierTabData.set('activeMarkets', {
        id: 'activeMarkets',
        number: data.activeMarkets,
        title: this.courierDataParam['activeMarkets'],
        percent: data.activeMarketsIncrease,
        status: data.activeMarketsIncrease ? (data.activeMarketsIncrease.indexOf("-") >= 0 ? 0 : 1) : 1
      });
    }
    this.courierTabData.set('expCount', {
      id: 'expCount',
        number: data.expCount,
      title: this.courierDataParam['expCount'],
      percent: data.expCountIncrease,
      status: data.expCountIncrease ? (data.expCountIncrease.indexOf("-") >= 0 ? 0 : 1) : 1
    });
    this.courierTabData.set('onlinePayed', {
      id: 'onlinePayed',
        number: data.onlinePayed,
      title: this.courierDataParam['onlinePayed'],
      percent: data.onlinePayedIncrease,
      status: data.onlinePayedIncrease ? (data.onlinePayedIncrease.indexOf("-") >= 0 ? 0 : 1) : 1
    });
    if(role === 2 || role === 3 || role === 4) {
      // 取件率（项目管理员、销售）
      this.courierTabData.set('gotRate', {
        id: 'gotRate',
        number: data.gotRate,
        title: this.courierDataParam['gotRate'],
        percent: data.gotRateIncrease,
        status: data.gotRateIncrease ? (data.gotRateIncrease.indexOf("-") >= 0 ? 0 : 1) : 1
      });
    } else {
      // 活跃度
      this.courierTabData.set('activeRate', {
        id: 'activeRate',
        number: data.activeRate,
        title: this.courierDataParam['activeRate'],
        percent: data.activeRateIncrease,
        status: data.activeRateIncrease ? (data.activeRateIncrease.indexOf("-") >= 0 ? 0 : 1) : 1
      });
    }
  }

  @computed get tabData() {
    return this.courierTabData.values();
  }

  @action setCourierListData(data) {
    data.forEach((user) => {
      user.key = user.id;
      this.courierListData.set(user.statDate, user);
    });
  }

  @computed get courierTableData() {
    return this.courierListData.values().reverse();
  }

  @computed get courierChartData() {
    if (this.courierListData){
      const dailyStatDatas = this.courierListData.values().map((item) => {
        const date = new Date(item.statDate);
        if(this.activeTabId === 'activeRate' || this.activeTabId === 'gotRate')
          return [date.getTime(), parseInt(item[this.activeTabId].replace('%', ''), 10)];
        else
          return [date.getTime(), item[this.activeTabId]]
      });
      return [{
        name: '统计',
        data: dailyStatDatas
      }]
    }
    else
      return []
  }

  // 不同身份获取快递员数据的接口不相同
  getCourierPromise(data) {
    if (this.rootStore.roleStore.role === 4) return projectApi.getProjectAreaStatData(data);
    return projectApi.getProjectStatData(data);
  }

  @action getProjectCourierData = (data) => {
    this.isLoading = true;
    this.courierTabData.clear();
    this.courierListData.clear();
    this.getCourierPromise(data).then((data) => {
      this.isLoading = false;
      if (data.status === "200") {
        this.setCourierTabData(data.data);
        this.setCourierListData(data.data.dailyStatDatas);
        this.setActiveTab(this.tabData[0].id);
      } else {
        message.error(data.message);
      }
    });
    // .finally(action(() => { this.isLoading = false; }));
  };

  @action getMarketingCourierData = (data) => {
    this.isLoading = true;
    this.courierTabData.clear();
    this.courierListData.clear();
    marketingApi.getSalesStatData(data).then((data) => {
      this.isLoading = false;
      if (data.status === "200") {
        this.setCourierTabData(data.data);
        this.setCourierListData(data.data.dailyStatDatas);
        this.setActiveTab(this.tabData[0].id);
      } else {
        message.error(data.message);
      }
    });
    // .finally(action(() => { this.isLoading = false; }));
  };


}