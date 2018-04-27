/**
 * Created by dadawang on 2018/2/2.
 */
import axios from 'axios'
import history from '../history';

// const allurl = {
//   liaosi: 'http://172.21.16.67:8080',
//   test: 'http://liaosi.tunnel.qydev.com',
//   server: 'http://crm.kuaidi100.com'
// }
const ajax = function (opt) {
  let promise = new Promise(function (resolve, reject) {
    if (axios) {
      if (!opt.json) {
        opt.data = JSON.stringify(opt.data)
      }
      if (!opt.contentType) {
        if(opt.data) {
          opt.contentType = 'application/json'
        } else if(opt.params) {
          opt.contentType = 'application/x-www-form-urlencoded'
        }
      }
      if (opt.async === undefined) {
        opt.async = true
      }

      axios({
        url: opt.url,
        data: opt.data,
        params: opt.params,
        dataType: 'json',
        method: opt.method,
        headers: {
          'Content-Type': opt.contentType
        },
        withCredentials: true,
      }).then((res) => {
        if (res.data.status === '403'){
          history.push('/page/login');
        } else {
          resolve(res.data);
        }
      }, (err) => {
        reject(err);
      });

      // axios({
      //     dataType: 'json',
      //     async: opt.async,
      //     data: opt.data,
      //     url: opt.url,
      //     type: opt.method,
      //     beforeSend: function (request) {
      //         // 通常在HTTP协议里，客户端像服务器取得某个网页的时候，必须发送一个HTTP协议的头文件
      //         request.setRequestHeader('Accept-Language', 'zh-CN')
      //     },
      //     success: function (data) {
      //         resolve(data)
      //     },
      //     error: function (err) {
      //         if (reject) {
      //             reject(err)
      //         }
      //     }
      // })
    } else {
      reject('没有引入axios库，代码无法执行！')
    }
  })

  return promise
}

export default ajax