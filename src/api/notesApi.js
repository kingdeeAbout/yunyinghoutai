/**
 * Created by Administrator on 2018/3/10.
 */
import ajax from '../libs/ajax'

// process.env.NODE_ENV === 'development' && require('../mock/notesMock');

class Notes {
  getRecordsData (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        // url: '/crm/role/notes',
        url: '/crm/note/list',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }

  addRecordsData (data) {
    return new Promise(function (resolve, reject) {
      ajax({
        // url: '/crm/role/notes',
        url: '/crm/note/add',
        json: true,
        data: data,
        method: 'post'
      }).then(function (data) {
        resolve(data)
      })
    })
  }
}

export default Notes