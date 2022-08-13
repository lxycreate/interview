Function.prototype.customBind = function (obj, ...args) {
    const self = this;
    return function () {
        const s = Symbol();
        // null和undefined
        if (obj === null || obj === undefined) {
            obj = window;
        }
        // 如果是基本类型，转换为包装类
        obj[s] = self;
        const result = obj[s](...args);
        delete obj[s];
        return result;
    };
};

function testBind(c, d) {
    const self = this;
    return c + d;
}

const item = new Number(1);
// console.log(testBind.customBind(1, 1, 2)());
