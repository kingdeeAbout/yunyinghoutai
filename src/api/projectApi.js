
import ajax from '../libs/ajax'

// process.env.NODE_ENV === 'development' && require('../mock/projectMock');

class projectApi {
  addProject (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/add',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  addManager (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/addAreaManager',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getProjectList (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/list',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getProjectAreaList (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/listProjectArea',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getSalesProjectList(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/salerList',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getProjectStatData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/statData',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getProjectAreaStatData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/areaStatData',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getAreaByCode(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/area/getByCode',
        data: data,
        json: false,
        method: 'POST'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  // 项目信息修改
  updateProject (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/update',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  updateProjectArea (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/project/updateProjectArea',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}

export default projectApi