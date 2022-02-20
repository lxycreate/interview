function isFunction(fnc) {
    return fnc instanceof Function
}

function MyPromise(fn) {
    this.state = 'Pending';
    this.value = '';
    this.reason = ''
    this.onFulfilledList = [];
    this.onRejectedList = [];

    const exe = ({ fnc, fulfilled = false, resolve, reject }) => {
        if (fulfilled && this.state === 'Fulfilled') {
            setTimeout(() => {
                try {
                    isFunction(fnc) && fnc(this.value)
                    isFunction(resolve) && resolve(this.value)
                } catch (e) {
                    isFunction(reject) && reject(e)
                }
            })
        } else if (!fulfilled && this.state === 'Rejected') {
            setTimeout(() => {
                try {
                    isFunction(fnc) && fnc(this.reason)
                    isFunction(reject) && reject(this.reason)
                } catch (e) {
                    isFunction(reject) && reject(e)
                }
            })
        }
    }

    const resolve = (val) => {
        if (this.state !== 'Pending') {
            return;
        }
        this.value = val;
        this.state = 'Fulfilled';
        this.onFulfilledList.forEach(fnc => { exe({ fnc, fulfilled: true }) })
    }

    const reject = (val) => {
        if (this.state !== 'Pending') {
            return;
        }
        this.reason = val;
        this.state = 'Rejected';
        this.onRejectedList.forEach(fnc => { exe({ fnc }) })
    }

    const deal = (onFulfilled, onRejected) => {
        isFunction(onFulfilled) && this.onFulfilledList.push(onFulfilled)
        isFunction(onRejected) && this.onRejectedList.push(onRejected)
        return new MyPromise((resolve, reject) => {
            isFunction(resolve) && this.onFulfilledList.push(resolve)
            isFunction(reject) && this.onRejectedList.push(reject)
            exe({ fnc: onFulfilled, fulfilled: true, resolve, reject })
            exe({ fnc: onRejected, resolve, reject })
        })
    }

    fn(resolve, reject)

    this.then = (onFulfilled, onRejected) => {
        return deal(onFulfilled, onRejected)
    }
    this.catch = (onRejected) => {
        return deal(null, onRejected)
    }
}

MyPromise.prototype.all = (promises) => {
    let resolveFn, rejectFn, isReject = false;
    const result = [], length = promises.length;
    const promise = new MyPromise((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    })

    promises.forEach((item, index) => {
        item.then((value) => {
            result[index] = value;
            if (result.length === length) {
                resolveFn(result)
            }
        }, (reason) => {
            if (!isReject) {
                rejectFn(reason)
                isReject = true;
            }
        })
    })

    return promise;
}

MyPromise.prototype.race = (promises) => {
    let resolveFn, rejectFn, hasDeal = false;
    const promise = new MyPromise((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    })

    promises.forEach((item, index) => {
        item.then((value) => {
            if (!hasDeal) {
                resolveFn(value)
                hasDeal = true
            }
        }, (reason) => {
            if (!hasDeal) {
                rejectFn(reason)
                hasDeal = true
            }
        })
    })
    return promise;
}

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {

    }
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject
    })
    return dfd;
}

module.exports = MyPromise;