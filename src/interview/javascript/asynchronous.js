/**
 * 实现instanceOf 
 */
function myInstanceOf(a, b) {
  try {
    let tmp = a.__proto__, O = b.prototype;
    while (tmp) {
      if (tmp == O) {
        return true;
      }
      tmp = tmp.__proto__;
    }
    return false;
  }
  catch (err) {
    return false;
  }
}

console.log(myInstanceOf({}, Object))

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
      case '[object Object]':
        result = copyObject(data);
        break;
      case '[object Array]':
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
    Object.keys(data).forEach(key => {
      result[key] = deepClone(data[key])
    })
    return result;
  }

  function copyArray(arr) {
    let result = [];
    mapRec.set(data, result);
    arr.forEach(item => {
      result.push(deepClone(item));
    })
    return result;
  }
}

const obj1 = {
  x: 1
}
// obj1.z = obj1;

const obj2 = {
  x: 2
}

obj1.next = obj2;
obj2.next = obj1;
const obj3 = deepCloneFnc(obj1);
console.log(obj3);

// async function async1() {
//   console.log('async1 start')
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2')
// }
// console.log('script start')
// // setTimeout(function () {
// //   console.log('setTimeout')
// // }, 0)
// async1();
// new Promise(function (resolve) {
//   console.log('promise1')
//   resolve();
// }).then(function () {
//   console.log('promise2')
// })
// // console.log('script end')


