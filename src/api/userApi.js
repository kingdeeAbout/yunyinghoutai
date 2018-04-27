import ajax from '../libs/ajax'

// process.env.NODE_ENV === 'development' && require('../mock/userMock');

class menuApi {
  getUserData(id) {
    return new Promise(function (resolve, reject) {
      ajax({
        url: '/crm/role/findusermenu',
        json: false,
        method: 'GET'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}

export default menuApi