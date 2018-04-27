/**
 * Created by Administrator on 2018/3/1.
 */
import ajax from '../libs/ajax'

// process.env.NODE_ENV === 'development' && require('../mock/loginMock');

class LoginApi {
  getValidCodeData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/login/getCode',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  getLoginData(data) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/login/loginCode',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}
export default LoginApi