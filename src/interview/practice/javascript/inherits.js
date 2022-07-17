/**
 * 实现继承
 */
function Parent(name) {
    this.name = name;
}

Parent.prototype.say = function () {
    console.log(this.name);
};

function Children(name) {
    Parent.call(this, name);
}

Children.prototype = new Parent();
Children.prototype.constructor = Children;

/**
 * 实现new */
function myNew(fn) {
    const obj = Object.create(fn.prototype);
    const result = fn.call(obj);
    if (result && result instanceof Object.prototype) {
        return result;
    }
    return obj;
}

function a() {
    return function () {};
}

console.log(new a());
