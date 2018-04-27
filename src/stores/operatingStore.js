
import {observable, action, computed} from 'mobx'
import OperatingApi from '../api/operatingApi'
import company from '../json/company.json'
import Format from '../libs/format'

const api = new OperatingApi();
const format = new Format();

export class OperatingStore {
  @observable hourStatData;
  @observable statData;
  @observable pieData;
  @observable projectStatData;
  @observable salesStatData;

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  clear() {
    this.hourStatData = [];
    this.statData = [];
    this.pieData = [];
    this.projectStatData = [];
    this.salesStatData = [];
  }

  @computed get hourStatChartData() {
    if (this.hourStatData) {
      const hourStatData = this.hourStatData.map((item) => {
        const time = item.time.split(" ");
        return {name: time[1] + ':00', y: item.orderNum};
      });
      return [{
        name: '昨天',
        data: hourStatData.slice(0, 24),
        dashStyle: 'dash'
      }, {
        name: '今天',
        data: hourStatData.slice(24),
      }]
    }
    else
      return []
  }

  // @computed get statChartData() {
  //   if (this.statData && this.statData.data)
  //     return this.statData.data.map((item) => {
  //       const date = new Date(item.date);
  //       return [date.getTime(), item.order]
  //     })
  //   else
  //     return []
  // }

  @computed get expSourcePieChartData() {
    if (this.pieData && this.pieData.expSource){
      let expSourcePieData = [];
      for(const key in this.pieData.expSource) {
        if(this.pieData.expSource.hasOwnProperty(key)) {
          expSourcePieData.push({name: key, y: this.pieData.expSource[key]});
        }
      }
      expSourcePieData.sort((a, b) => {
        return b.y - a.y
      });
      return expSourcePieData;
    }
    else
      return []
  }

  @computed get expTabidPieChartData() {
    if (this.pieData && this.pieData.expTabid){
      let expTabidPieData = [];
      for(const key in this.pieData.expTabid) {
        let name;
        if(this.pieData.expTabid.hasOwnProperty(key)){
          switch(key){
            case('printWaitCount'):{
              name = '待打印';
              break;
            }
            case('cancelCount'):{
              name = '已取消';
              break;
            }
            case('gotWaitCount'):{
              name = '待支付';
              break;
            }
            case('gotCount'):{
              name = '已取件';
              break;
            }
            default: {
              name = '其他';
            }
          }
          expTabidPieData.push({name: name, y: this.pieData.expTabid[key]});
        }
      }
      expTabidPieData.sort((a, b) => {
        return b.y - a.y
      });
      return expTabidPieData;
    }
    else
      return []
  }

  @computed get kuaidiComPieChartData() {
    if (this.pieData && this.pieData.kuaidiCom){
      let kuaidiComPieData = [];
      for(const key in this.pieData.kuaidiCom) {
        if(this.pieData.kuaidiCom.hasOwnProperty(key)){
          let name = '其他';
          for(const i in company) {
            if(company.hasOwnProperty(i) && company[i].number === key) {
              name = company[i].shortName;
              break;
            }
          }
          kuaidiComPieData.push({name: name, y: this.pieData.kuaidiCom[key]});
        }
      }
      kuaidiComPieData.sort((a, b) => {
        return b.y - a.y
      });
      return kuaidiComPieData;
    }
    else
      return []
  };

  @computed get payedPieChartData() {
    if (this.pieData && this.pieData.payed){
      let payedPieData = [];
      for(const key in this.pieData.payed) {
        if(this.pieData.payed.hasOwnProperty(key)) {
          let name;
          switch (key) {
            case('online'):
            case('onlinePayed'): {
              name = '在线支付';
              break;
            }
            case('offline'):
            case('offlinePayed'): {
              name = '现金支付';
              break;
            }
            default: {
              name = '其他';
            }
          }
          payedPieData.push({name: name, y: this.pieData.payed[key]});
        }
      }
      payedPieData.sort((a, b) => {
        return b.y - a.y
      });
      return payedPieData;
    }
    else
      return []
  };

  @action getHourStatData = () => {
    api.getHourStatData({}).then((data) => {
      if(data.status === "200") {
        this.hourStatData = data.data;
      }
    });
  };
  @action getStatData = (type) => {
    let startDate, endDate;
    switch (type) {
      case("today"): {
        const now = new Date();
        startDate = endDate = format.formatDateToString(now, 'yyyy-MM-dd');
        break;
      }
      case("yesterday"): {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        startDate = endDate = format.formatDateToString(yesterday, 'yyyy-MM-dd');
        break;
      }
      default: {
        startDate = endDate = '';
      }
    }
    api.getStatData({
      startDate: startDate,
      endDate: endDate
    }).then((data) => {
      if(data.status === "200") {
        this.statData = data.data;
      }
    });
  };
  @action getPieData = (type) => {
    let startDate, endDate;
    switch (type) {
      case("today"): {
        const now = new Date();
        startDate = endDate = format.formatDateToString(now, 'yyyy-MM-dd');
        break;
      }
      case("yesterday"): {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        startDate = endDate = format.formatDateToString(yesterday, 'yyyy-MM-dd');
        break;
      }
      default: {
        startDate = endDate = '';
      }
    }
    api.getPieData({
      startDate: startDate,
      endDate: endDate
    }).then((data) => {
      if(data.status === "200") {
        this.pieData = data.data;
      }
    });
  };

  @action getProjectStatData = (sbid) => {
    api.getProjectStatData({
      sbid: sbid
    }).then((data) => {
      if(data.status === "200") {
        this.projectStatData = data.data;
      }
    });
  };

  @action getSalesStatData = () => {
    api.getSalesStatData({}).then((data) => {
      if(data.status === "200") {
        this.salesStatData = data.data;
      }
    });
  }
}