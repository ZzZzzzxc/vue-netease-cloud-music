export function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isNaN(val) {
  return val !== val;
}

export function formatNumber(number) {
  number = Number(number) || 0;
  return number > 100000 ? `${Math.round(number / 10000)}万` : number;
}

export function flattenDeep(array, depth = Infinity, result = []) {
  if (array == null) {
    return result;
  }
  for (const value of array) {
    if (depth && Array.isArray(value)) {
      if (depth > 1) {
        flattenDeep(value, depth - 1, result);
      } else {
        result.push(...value);
      }
    } else {
      result[result.length] = value;
    }
  }
  return result;
}

export function pad(num, n = 2) {
  let len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num.toString();
}

export function formatTime(interval) {
  interval = interval | 0;
  const minute = pad((interval / 60) | 0);
  const second = pad(interval % 60);
  return `${minute}:${second}`;
}

export function formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
  date = date instanceof Date ? date : new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

export function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function isEmail(val) {
  const pattern = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
  return pattern.test(val);
}

export function brightenKeyword(val, keyword, color = "#d33a31") {
  const Reg = new RegExp(keyword, "i");
  if (val) {
    return val.replace(Reg, `<span style="color: ${color}">${keyword}</span>`);
  }
}
