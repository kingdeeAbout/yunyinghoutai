
import ajax from '../libs/ajax'

// process.env.NODE_ENV === 'development' && require('../mock/marketingMock');

class marketingApi {
  getList (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/saler/list',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getDetail (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/saler/statData',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getSalesStatData (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/saler/allStatData',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getBasicInfo (data) {         // 数据看板单独接口
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/staff/detail',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getAllSales () {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/saler/allSalers',
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  addSalesData (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/saler/addSaler',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}

export default marketingApi