/**
 * @Description: promise
 * @Author: lixianying
 * @Date: 2020-09-01
 */

function MyPromise() {
  this.state = "pending";
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];
  this.then = function (onFulfilled, onRejected) {

  }
}

MyPromise.all = function (arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      reject(new TypeError('arguments must be an array'))
    }
    let len = arr.length, result = [];
    arr.forEach((ele, index) => {
      Promise.resolve(ele).then(res => {
        result.push(res);
        if (index === len) {
          resolve(result)
        }
      }, res => { reject(res) })
    })
  })
}

console.log(Promise.reject)