/**
 * @Description: 面试
 * @Author: lixianying
 * @Date: 2020-09-09
 */
// 2020.09.08 - 快手
/**
 * 快手-获取多维数组的层级
 */
Array.prototype.getLevel = function () {
  function getLevel(arr, level = 1, result = { max: 1 }) {
    if (level > result.max) {
      result.max = level;
    }
    let len = arr.length;
    for (let i = 0; i < len; ++i) {
      if (Array.isArray(arr[i])) {
        getLevel(arr[i], level + 1, result)
      }
    }
    return result.max
  }
  return getLevel(this);
}

/**
 * 快手-获取不重复字符的全排列
 */
function getSort(arr) {
  function mySort(arr, path = [], result = []) {
    let len = arr.length;
    if (len === 1) {
      result.push([...path, arr[0]]);
    }
    for (let i = 0; i < len; ++i) {
      mySort(arr.filter((item, index) => { return index !== i }), [...path, arr[i]], result)
    }
    return result;
  }
  return mySort(arr);
}