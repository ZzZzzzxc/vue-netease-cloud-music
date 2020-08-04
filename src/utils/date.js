// 时间戳转时间
export function timestampToTime(timestamp) {
  const time =
    timestamp.toString().length === 10 ? timestamp * 1000 : timestamp;
  let date = new Date(time);
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = date.getDate() + " ";
  //   let h = date.getHours();
  //   let m = date.getMinutes();
  //   let s = date.getSeconds(;
  return Y + M + D;
}
