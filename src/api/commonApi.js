/**
 * Created by Administrator on 2018/3/1.
 */
import ajax from '../libs/ajax'

process.env.NODE_ENV === 'development' && require('../mock/xzqMock');

class CommonApi {
  getArea(level) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/area/getByLevel',
        json: true,
        data: {
          level: level
        },
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getChilds(code) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/area/getChilds',
        json: true,
        data: {
          code: code
        },
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}
export default CommonApi