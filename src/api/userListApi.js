import ajax from '../libs/ajax'

// process.env.NODE_ENV === 'development' && require('../mock/userListMock');

class UserListApi {
  getUserList(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/saler/mktList',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getProjectUserList(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/mktbelong/project/mktlist',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getManagerUserList(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/mktinfo/list',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getMarketMonthlyStat(data){
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/mktinfo/listStat',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  addMobile(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/mktbelong/saler/mobileAdd',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  addProjectMobileUser(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/mktbelong/project/mobileAdd',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  addProjectAreaUser(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/mktbelong/project/areaAdd',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}

export default UserListApi