/*
 * num 数值转换为数字
 * */
export const toNumble = (num) => {
  if (isNaN(num) || num === null) return '-';
  return num - 0;
};

/*
 * 保留小数位
 * num 需要保留位数的数字
 * n 保留的位数
 * */
export const tofixed = (num, n = 0) => {
  if (isNaN(toNumble(num))) return 0;
  let flag = 1;
  if (num < 0) {
    flag = -1;
    num *= -1;
  }
  num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, -(n + 1));
  return (num * flag).toFixed(n) - 0;
};

/*
 * 千分位
 * num 需要转换的数字
 * */
export const numFormat = (num) => {
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

/*
 * 获取url参数
 * url 需要转换的数字
 * */
export const getKeyworld = (url) => {
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

// 时间格式化
export const dateFormat = (fmt, date) => {
  let ret;
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
    }
  }
  return fmt;
};

// 时间格式化
export const iosDateFormat = (times, format) => {
  if (times && times !== 'null') {
    let strTime = times.replace(/\-/g, '/');
    return dateFormat(format, new Date(strTime));
  } else {
    return '-';
  }
};