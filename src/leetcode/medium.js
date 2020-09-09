/**
 * @Description: 中等难度
 * @Author: lixianying
 * @Date: 2020-09-09
 */

/**
 * 合并数组区间 
 */
var merge = function (intervals) {
  if (intervals.length < 2) {
    return intervals;
  }
  let i = 0;
  while (i < intervals.length) {
    let temp = intervals[i], len = intervals.length,
      j = i + 1, res = [];
    while (j < len) {
      let m = intervals[j];
      if (m[0] >= temp[0] && m[0] <= temp[1] && m[1] >= temp[1]) {
        res = [temp[0], m[1]];
        break;
      } else if (temp[0] >= m[0] && temp[0] <= m[1] && temp[1] >= m[1]) {
        res = [m[0], temp[1]];
        break;
      } else if (temp[0] >= m[0] && temp[1] <= m[1]) {
        res = [...m];
        break;
      } else if (m[0] >= temp[0] && m[1] <= temp[1]) {
        res = [...temp];
        break;
      } else {
        ++j;
      }
    }
    if (res.length) {
      intervals[j] = res;
      intervals.splice(i, 1);
    } else {
      ++i;
    }
  }
  return intervals;
};

console.log(merge([[1, 4], [2, 3]]))