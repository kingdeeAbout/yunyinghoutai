/**
 * Created by dadawang on 2018/3/1.
 */
import {observable, autorun, action} from 'mobx'
import { message } from 'antd';
import LoginApi from '../api/loginApi'
import BaseCheck from '../libs/baseCheck'

const api = new LoginApi();
const baseCheck = new BaseCheck();

export class LoginStore{

  @observable mobile;
  @observable validGap = 0;

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.validWait();
  }

  validWait = () => {
    autorun(()=> {
      if (this.validGap > 0){
        // console.log(this.validGap);
        setTimeout(() => {
          this.validGap --;
        }, 1000);
      }
    })
  };

  clear() {
    this.validGap = 0;
  }

  @action getValidCodeData = (mobile) => {
    // console.log(mobile);
    this.mobile = mobile;
    if (baseCheck.isPhone(this.mobile)) {
      api.getValidCodeData({"mobile": this.mobile}).then((data) => {
        if (data.status === "200") {
          // 不做处理
          this.validGap = 60;
          message.success("验证码已发送");
        } else {
          message.error(data.message);
        }
      });
    } else {
      message.error("手机号格式错误");
    }
  };

  @action getLoginData = (code, callback) => {
    api.getLoginData({"mobile": this.mobile, "code": code}).then((data) => {
      if (data.status === "200") {
        localStorage.setItem("user_info", JSON.stringify(data.data));
        callback();
        message.success(data.message)
      } else {
        message.error(data.message)
      }
    });
  };

}