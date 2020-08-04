export function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
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

export function ObjArr2Arr(array, key) {
  const res = [];
  array.map(item => res.push(item[key]));
  return res;
}
