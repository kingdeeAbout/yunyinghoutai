/**
 * Created by Administrator on 2018/4/19.
 */
import ajax from '../libs/ajax'

class Order {
  getOrderListData (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/express/listByPage',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getPackageData (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/express/detail',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getTranportData (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/express/deliverInfo',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

}

export default Order