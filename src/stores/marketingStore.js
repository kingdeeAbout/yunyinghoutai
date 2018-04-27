/**
 * Created by dadawang on 2018/2/6.
 */
import {observable, action, computed} from 'mobx'
import { message } from 'antd';
import MarketingApi from '../api/marketingApi'

const api = new MarketingApi();

export class MarketingStore {
  @observable isLoading = false;
  @observable activeId;
  //已达标、未达标列表数据
  @observable standardCardlist = observable.map();
  @observable standardFailCardlist = observable.map();
  @observable allSalesList = observable.map();
  @observable salesBasicInfo = {};

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  clear() {
    this.activeId = '';
    this.standardCardlist.clear();
    this.standardFailCardlist.clear();
    this.allSalesList.clear();
    this.salesBasicInfo = {};
  }

  @action setActiveId = (id) => {
    this.activeId = id;
    this.getMarketingDetail(id);
  };

  // @computed get CardsData() {
  //   if (this.standardCardlist && this.standardCardlist.data) {
  //     return this.standardCardlist.data.map((item) => {
  //       return {
  //         id: item.id,
  //         // active: 0,
  //         sbid: item.sbid,
  //         status: 1,
  //         name: item.nickname ? item.nickname : "-",
  //         percent: item.finishRate ? item.finishRate : "-",
  //         subname: item.orgName ? item.orgName : "-",
  //         number: item.saleTarget.newMarkets + ","+ item.saleTarget.activeMarkets + "," + item.saleTarget.perExpCount,
  //         per: item.saleTarget.lossMarkets
  //       };
  //     })
  //   } else {
  //     return []
  //   }
  // }

  @computed get activeMarketing() {
    return this.standardCardlist.get(this.activeId);
  }

  @computed get marketingData() {
    return this.standardCardlist.values();
  }

  @action getMarketingList = () => {
    this.isLoading = true;
    this.standardCardlist.clear();
    api.getList({}).then((data) => {
      this.isLoading = false;
      if (data.status === "200" && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          item.key = item.id;
          this.standardCardlist.set(item.id, item);
        });
        this.setActiveId(data.data[0].id);
      } else {
        message.error(data.message);
      }
    });
    // .finally(action(() => { this.isLoading = false; }));

    // api.getList('standardFail').then((data) => {
    //   // console.log(data.data);
    //   this.standardFailCardlist = data.data;
    // });
  };

  @action getMarketingDetail = (id) => {
    this.rootStore.courierStore.getMarketingCourierData({
      queryType: 1,
      stid: id
    });
  };

  @action getSalesInfo = () => {
    api.getBasicInfo().then((data) => {
      if (data.status === "200") {
        this.salesBasicInfo = data.data;
        this.getMarketingDetail(data.data.id);
      } else {
        message.error(data.message);
      }
    });
  };

  @computed get allSalesData() {
    return this.allSalesList.values();
  }

  @action getAllSalesList = () => {
    this.allSalesList.clear();
    api.getAllSales().then((data) => {
      if (data.status === "200" && data.data && data.data.length > 0) {
        data.data.forEach((item) => {
          item.key = item.id;
          this.allSalesList.set(item.id, item);
        });
      }
    });
  };

  @action addSales = (data, callback) => {
    api.addSalesData(data).then((data) => {
      if (data.status === "200") {
        message.success(data.message);
        typeof(callback) === "function" && callback();
      } else {
        message.error(data.message);
      }
    });
  }
}