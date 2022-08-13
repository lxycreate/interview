// 多参数柯里化；
const curry = function (fn) {
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function () {
                console.log(arguments);
                return curriedFn(...args.concat([...arguments]));
            };
        }
        return fn(...args);
    };
};
const fn = (x, y, z, a) => x + y + z + a;
const myfn = curry(fn);
console.log(myfn);
console.log(myfn(1)(2)(3)(1));


/**
 * 记忆函数
 * @param {*} func
 * @param {*} content
 */
const memoize = function (func, content) {
    let cache = Object.create(null);
    content = content || this;
    return (...key) => {
        if (!cache[key]) {
            cache[key] = func.apply(content, key);
        }
        return cache[key];
    };
};

const add = (a, b) => a + b;
const calc = memoize(add);
console.log(calc(10, 10));
