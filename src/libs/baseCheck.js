/* eslint-disable */
/**
 * Created by dadawang on 2017/10/12.
 */
class baseCheck {
  /**
   * 长度校验
   * @param {string} big  大的数据
   * @param {string} small  小的数据
   * @return {boolean} 返回bool值
   * */
  lengthCheck(big, small) {
    return big >= small;
  }

  /**
   * 相等校验
   * @param {string} nval  新的数据
   * @param {string} oval  旧的数据
   * @return {boolean} 返回bool值
   * */
  npwdCheck(nval, oval) {
    return nval === oval;
  }

  /**
   * 电话验证
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  isPhone(d) {
    return /^\d{11}$/.test(d);
  }

  /**
   * QQ号验证
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  isQQ(d) {
    return /^[1-9]\d{4,13}$/.test(d);
  }

  /**
   * 邮箱验证
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  isMail(d) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(d);
  }

  /**
   * 是否是空的字符
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  notEmpty(d) {
    return d !== '' && d !== undefined && d !== null;
  }

  /**
   * 是否是中文 {1,10} 长度
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  isChinese(d) {
    return /^[\u4e00-\u9fa5]{1,10}$/.test(d);
  }

  /**
   * 正数 小数点后面两位
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  ispnum(d) {
    return /^\d+(\.\d{1,2})?$/.test(d)
  }

  /**
   * 只能是数字和字母
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  isNumAndStr(d) {
    return /^[a-zA-Z0-9]+$/.test(d)
  }

  /**
   * 正整数
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  isPlusNum(d) {
    return /^\d+$/.test(d)
  }

  /**
   * 链接验证 http://www.baidu.com    https://www.baidu.com
   * @param {string} d  需要校验的数据
   * @return {boolean} 返回bool值
   * */
  isUrl(d) {
    return /^(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w\.\(\)\-\*,@?^=%&:/`~\+#!$\u4e00-\u9fa5]*[\w\.\(\)\-\*,@?^=%&:/~`\+#!$\u4e00-\u9fa5])+$/.test(d)
  }


  // 纯数字验证
  isNumber(a) {
    return a.replace(/[^\?\d.]/g, '')
  }
  // 推广编码校验（字母+数字）
  partnerCode(a) {
    return ((/^(?!\D+$)(?![^a-zA-Z]+$)\S$/.test(String(a))) && (String(a).indexOf("$") != -1) && (String(a).indexOf("#") != -1))
  }
}

export default baseCheck;