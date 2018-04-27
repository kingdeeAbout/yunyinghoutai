import ajax from '../libs/ajax'

// process.env.NODE_ENV === 'development' && require('../mock/operatingMock');

class operatingApi {
  getHourStatData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/homeData/getHourStatData',
        json: false,
        data: data,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
  getStatData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/homeData/getStatData',
        json: false,
        data: data,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
  getPieData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/homeData/getPieData',
        json: false,
        data: data,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
  getProjectStatData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/todayStat',
        json: false,
        data: data,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
  getSalesStatData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/saler/todayStat',
        json: false,
        data: data,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}

export default operatingApi