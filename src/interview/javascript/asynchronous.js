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

function deepClone(data) {
  if (!(data instanceof Object)) {
    return data;
  }
  let type = getType(data);
  switch (type) {
    case '[object Object]':
      return copyObject(data);
    case '[object Array]':
      return copyArray(data);
    default:
      return data;
  }
}

/**
 * 深拷贝
 */
function copyObject(data) {
  let result = {};
  Object.keys(data).forEach(key => {
    result[key] = deepClone(data[key])
  })
  return result;
}

function copyArray(arr) {
  let result = [];
  arr.forEach(item => {
    result.push(deepClone(item));
  })
  return result;
}

function getType(data) {
  return Object.prototype.toString.call(data);
}

// let tmp = { b: 1, c: 2, d: { t: 1, z: 2 }, arr: [1, 2, 3, 4], arr2: [{ l: 2, e: 1 }] };
// let result = deepClone(tmp);
// console.log(result);
// console.log(tmp == result);

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
// setTimeout(function () {
//   console.log('setTimeout')
// }, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1')
  resolve();
}).then(function () {
  console.log('promise2')
})
// console.log('script end')


