/**
 * @description: 获取cookie
 * @param {*} cookie_name
 * @return {*} value
 */
export const getCookie = cookie_name => {
  let arr,
    reg = new RegExp('(^| )' + cookie_name + '=([^;]*)(;|$)');
  arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

/**
 * @description: 解析url参数
 * @param {*} url
 * @return {*} 键值对
 */
export const getKeyworld = url => {
  let reg = /[?&]([^?&#]+)=([^?&#]+)/g;
  let param = {};
  let ret = reg.exec(url);
  while (ret) {
    //当ret为null时表示已经匹配到最后了，直接跳出
    param[ret[1]] = ret[2];
    ret = reg.exec(url);
  }
  return param;
};

/**
 * @description: 数值转换数字
 * @param {*} num
 * @return {*} 
 */
export const toNumble = num => {
  if (isNaN(num) || num === null) return '-';
  return num - 0;
};

/**
 * @description: 保留小数位
 * @param {*} num 需要保留位数的数字
 * @param {*} n 保留的位数
 * @return {*}
 */
export const tofixed = (num, n = 0) => {
  if (isNaN(toNumble(num))) return 0;
  let flag = 1;
  if (num < 0) {
    flag = -1;
    num *= -1;
  }
  num =
    Math.round(num * Math.pow(10, n)) / Math.pow(10, n) +
    Math.pow(10, -(n + 1));
  return (num * flag).toFixed(n) - 0;
};

/**
 * @description: 千分位
 * @param {*} num 需要转换的数字
 * @return {*} 1,000
 */
export const numFormat = num => {
  let res = '';
  if ((num && num.toString()) || num === 0) {
    res = num.toString().replace(/\d+/, function (n) {
      return n.replace(/(\d)(?=(\d{3})+$)/g, function (m) {
        return m + ',';
      });
    });
  }
  return res;
};

/**
 * @description: 时间格式化
 * @param {*} fmt YYYY-mm-dd HH:MM:SS
 * @param {*} date 时间
 * @return {*}
 */
export const dateFormat = (fmt, time) => {
  let ret;
  let date = time.replace(/\\-/g, '/');
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      );
    }
  }
  return fmt;
};

/**
 * @description: 转数字
 * @param {*} num 
 * @return {*}
 */
export const toNonExponential = num => {
  let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
};

/**
 * @description: 乘法-js运算精度丢失问题
 * @param {*} arg1 
 * @param {*} arg2
 * @return {*} 0.0023 * 100 ==> 0.22999999999999998
 */
export const floatMultiply = (arg1, arg2) => {
  arg1 = Number(arg1);
  arg2 = Number(arg2);
  if ((!arg1 && arg1 !== 0) || (!arg2 && arg2 !== 0)) {
    return null;
  }
  arg1 = toNonExponential(arg1);
  arg2 = toNonExponential(arg2);
  let n1, n2;
  let r1, r2; // 小数位数
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  n1 = Number(arg1.toString().replace('.', ''));
  n2 = Number(arg2.toString().replace('.', ''));
  return n1 * n2 / Math.pow(10, r1 + r2);
};
