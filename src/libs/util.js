/* *
 *@method 格式时间戳
 *@param new Date().Format('yyyy-MM-dd hh:mm:ss')
 *@return {String}
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ?
          o[k] :
          ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};


/* *
 *@method 获取cookie
 */
export function getCookie (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};


/* *
 *@method 删除cookie
 */
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

//格式化时间
export function utiltime (date) {
  let nstr = new Date(date) //当天时间
  let now_year = nstr.getFullYear() // 年份
  let now_month =
    nstr.getMonth() + 1 < 10
      ? '0' + (nstr.getMonth() + 1)
      : nstr.getMonth() + 1 // 月份
  let now_day = nstr.getDate() < 10 ? '0' + nstr.getDate() : nstr.getDate() // 日期
  let now_hour = nstr.getHours() < 10 ? '0' + nstr.getHours() : nstr.getHours() // 小时
  let now_minute = nstr.getMinutes() < 10 ? '0' + nstr.getMinutes() : nstr.getMinutes() // 分钟
  let now_second = nstr.getSeconds() < 10 ? '0' + nstr.getSeconds() : nstr.getSeconds() // 秒
  return (
    now_year + '-' + now_month + '-' + now_day + ' ' + now_hour + ':' + now_minute + ':' + now_second
  )
}

//判断上传文件格式是否为图片
export function imageName (imgUrl) {
  if ((imgUrl && imgUrl.toString().indexOf('.png') > -1) ||
  (imgUrl && imgUrl.toString().indexOf('.jpeg') > -1) ||
  (imgUrl && imgUrl.toString().indexOf('.jpg') > -1) ||
  (imgUrl && imgUrl.toString().indexOf('.gif') > -1) ||
    (imgUrl && imgUrl.toString().indexOf('.psd') > -1)) {
    return true
  } else {
    return false
  }
}
