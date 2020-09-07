/**
 * @Description: promise
 * @Author: lixianying
 * @Date: 2020-09-01
 */
function Promise(excutator) {
  this.state = "pending";
  this.value = '';
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
      setTimeout(() => {
        this.onFulfilledCallbacks.forEach(fn => { fn(value) })
      }, 0);
    }
  }

  const reject = (err) => {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.value = err;
      setTimeout(() => {
        this.onRejectedCallbacks.forEach(fn => { fn(err) })
      }, 0);
    }
  }

  try {
    excutator(resolve, reject);
  }
  catch (err) {
    reject(err)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
  let promise = new Promise((resolve, reject) => {
    if (this.state === 'pending') {
      this.onFulfilledCallbacks.push(setTimeout((onFulfilled) => {
        try {
          let x = onFulfilled(this.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      }));
      this.onRejectedCallbacks.push(setTimeout((onRejected) => {
        try {
          let x = onRejected(this.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      }));
    }
    else if (this.state === 'rejected') {
      setTimeout((onRejected) => {
        try {
          let x = onRejected(this.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      })
    } else if (this.state === 'fulfilled') {
      setTimeout((onFulfilled) => {
        try {
          let x = onFulfilled(this.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      })
    }
  });
  return promise;
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new Error('promise circle'));
  }
}

Promise.prototype.resolve = function (promise) {
  if (promise instanceof Promise) {
    return promise;
  } else if (promise && typeof promise.then === 'function') {
    setTimeout(() => {
      promise.then();
    });
    return new Promise((resolve, rejet) => { })
  } else {
    return new Promise((resolve, rejet) => {
      resolve(promise);
    })
  }
}

console.log(Promise.prototype.resolve(0))

// let tz = Promise.resolve(0)
// console.log(tz)

Promise.prototype.all = function (arr) {
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

Promise.prototype.finally = function (callback) {
  return this.then(res => {
    typeof callback == 'function' && callback(res);
  }, err => {
    typeof callback == 'function' && callback(err);
  })
}

Promise.prototype.race = function (promises) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(promises) && promises.length) {
      promises = [...promises];
      promises.forEach(promise => {
        promise.then(res => {
          resolve(res);
        }, err => { reject(err); })
      })
    }
  })
}

// module.exports = Promise;

// let t = new Promise((resolve, reject) => {
//   resolve(99);
//   // reject(10085);
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// }).then(res => { console.log(res) });

// t.then(res => {
//   console.log(res)
// })