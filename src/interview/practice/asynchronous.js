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

// console.log(myInstanceOf({}, Object))
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
// console.log(obj3);

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('微二')
  await async3()
  console.log('微四')
  await async4();
  console.log('微五')
}
async function async1Copy() {
  return new Promise((resolve) => {
    console.log('async1 start')
    async2()
    resolve()
  }).then(() => {
    new Promise((resolve) => {
      console.log('微二');
      async3()
      resolve()
    }).then(() => {
      new Promise(resolve => {
        console.log('微四')
        async4();
        resolve()
      }).then(() => {
        new Promise((resolve) => {
          console.log('微五')
          resolve()
        })
      })
    })
  })
}

async function async2() {
  console.log('async2')
}
async function async3() {
  console.log('async3')
}
async function async4() {
  console.log('async4')
}
// new Promise(function (resolve) {
//   console.log('promise1')
//   resolve();
// }).then(function () {
//   console.log('微一') // 微一
// })

// async1Copy();
// async1();

// new Promise(function (resolve) {
//   console.log('promise2')
//   resolve();
// }).then(function () {
//   console.log('微三') // 微一
// })

// new Promise(function (resolve) {
//   console.log('promise3')
//   resolve();
// }).then(function () {
//   console.log('微三+') // 微一
// })

// function test() {
//   setTimeout(() => {
//     console.log(9);
//     Promise.resolve().then(res => {
//       console.log(99)
//     })
//   })
//   setTimeout(() => {
//     console.log(8);
//     Promise.resolve().then(res => {
//       console.log(88)
//     })
//   })
// }

// test();
// Promise.resolve().then(res => {
//   console.log(77)
// })

// let a = {
//   value: 1,
//   valueOf: function () {
//     return this.value++;
//   }
// }

// console.log(a == 1 && a == 2 && a == 3)

let obj = {
  value: 1,
  fn: function () {
    var test = function () {
      this.value++;
    };
    test();
  } 
}

// obj.fn();
// console.log(obj.value)

function es() {
  console.log(this)
}

es.call(null)
es.apply({})