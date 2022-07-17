/**
 * 深度克隆包含环形引用
 */
function deepCloneFnc(oldData) {
  let mapRec = new Map();
  function deepClone(data) {
    if (!(data instanceof Object)) {
      return data;
    }
    let result = mapRec.get(data);
    if (result) {
      return result;
    }
    let type = getType(data);
    switch (type) {
      case "[object Object]":
        result = copyObject(data);
        break;
      case "[object Array]":
        result = copyArray(data);
        break;
      default:
        result = data;
        break;
    }
    return result;
  }

  return deepClone(oldData);

  function getType(data) {
    return Object.prototype.toString.call(data);
  }
  /**
   * 深拷贝
   */
  function copyObject(data) {
    let result = {};
    mapRec.set(data, result);
    Object.keys(data).forEach((key) => {
      result[key] = deepClone(data[key]);
    });
    return result;
  }

  function copyArray(arr) {
    let result = [];
    mapRec.set(data, result);
    arr.forEach((item) => {
      result.push(deepClone(item));
    });
    return result;
  }
}

const obj1 = {
  x: 1,
};
// obj1.z = obj1;

const obj2 = {
  x: 2,
};

obj1.next = obj2;
obj2.next = obj1;
const obj3 = deepCloneFnc(obj1);
