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
      this.onFulfilledCallbacks.push(() => {
        try {
          let x = onFulfilled(this.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
      this.onRejectedCallbacks.push(() => {
        try {
          let x = onRejected(this.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });
    }
    else if (this.state === 'rejected') {
      setTimeout(() => {
        try {
          let x = onRejected(this.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      })
    } else if (this.state === 'fulfilled') {
      setTimeout(() => {
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
  //PromiseA+ 2.3.1
  if (promise === x) {
    reject(new TypeError('Chaining cycle'));
  }
  if (x && typeof x === 'object' || typeof x === 'function') {
    let used; //PromiseA+2.3.3.3.3 只能调用一次
    try {
      let then = x.then;
      if (typeof then === 'function') {
        //PromiseA+2.3.3
        then.call(x, (y) => {
          //PromiseA+2.3.3.1
          if (used) return;
          used = true;
          resolvePromise(promise, y, resolve, reject);
        }, (r) => {
          //PromiseA+2.3.3.2
          if (used) return;
          used = true;
          reject(r);
        });

      } else {
        //PromiseA+2.3.3.4
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      //PromiseA+ 2.3.3.2
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    //PromiseA+ 2.3.3.4
    resolve(x);
  }
}

Promise.prototype.resolve = function (promise) {
  if (promise instanceof Promise) {
    return promise;
  }
  if (typeof promise === 'object' || typeof promise === 'function') {
    try {
      // 判断是否有then方法
      let then = promise.then;
      if (typeof then === 'function') {
        return new Promise(then.call(promise)); // 执行value方法
      }
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }
  return new Promise((resolve, reject) => {
    resolve(promise);
  });
}

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

let a = new Promise((resolve, reject) => {
  resolve(1)
})

let b = a.then((val) => { return val }, (val) => { console.log(val) })

setTimeout(() => { console.log(b) })