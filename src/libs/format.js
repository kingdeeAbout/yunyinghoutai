

class Format {

  /**
   * 格式化长数字缩写
   * @param {Number} n  数字
   * @return {String} 数字缩写
   * */
  formatLongNumber(n) {
    if(n > 1000000000000){
      return (n / 1000000000000).toPrecision(5) + "兆";
    } else if(n > 100000000){
      return (n / 100000000).toPrecision(5) + "亿";
    } else if (n > 100000) {
      return (n / 10000).toPrecision(5) + "万";
    } else
      return n.toString();
  }

  /**
   * 格式化数字为两位
   * @param {Number} n  数字
   * @return {String} 2位数字
   * */
  formatNumber(n) {
    const str = n.toString();
    return str[1] ? str : '0' + str;
  }

  /**
   * 格式化时间字符串
   * @param {Date} date  时间对象
   * @param {String} format  时间格式
   * @return {String} 返回格式化后的字符串
   * */
  formatDateToString(date, format) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    format = format.replace(/yyyy/g, this.formatNumber(year));
    format = format.replace(/MM/g, this.formatNumber(month));
    format = format.replace(/dd/g, this.formatNumber(day));
    format = format.replace(/HH/g, this.formatNumber(hour));
    format = format.replace(/mm/g, this.formatNumber(minute));
    format = format.replace(/ss/g, this.formatNumber(second));
    return format
  }
}
export default Format;