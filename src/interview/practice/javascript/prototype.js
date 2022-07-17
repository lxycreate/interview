/**
 * @Description: 原型链
 * @Author: lixianying
 * @Date: 2020-06-24
 */
Function.prototype.myCall = function (thisArg, ...reset) {
  let contxt = thisArg || window,
    key = Symbol();
  contxt[key] = this;
  let result = contxt[key](...reset);
  return result;
};

Function.prototype.myApply = function (thisArg, reset) {
  let contxt = thisArg || window,
    key = Symbol();
  contxt[key] = this;
  let result = contxt[key](...reset);
  return result;
};

Function.prototype.myBind = function (thisArg, ...reset) {
  let contxt = thisArg || window,
    key = Symbol();
  contxt[key] = this;
  let result = contxt[key](...reset);
  return function () {
    return result;
  };
};
function test(prop) {
  console.log(this.name);
  console.log(`test - ${prop}`);
  return "bind-return";
}

test.myCall({ name: "myCall" }, "myCall");

console.log(test.myApply({ name: "myApply" }, ["myApply"]));

console.log(test.myBind({ name: "myBind" }, "myBind")());

/**
 * 手写new
 */
function myNew(fn) {
  let obj = Object.create(fn),
    res = fn.call(obj);
  if (res instanceof Object) {
    return res;
  }
  return obj;
}

function testNew() {
  return [];
}
console.log(new testNew());

/**
 * 实现instanceOf
 */
function myInstanceOf(a, b) {
  try {
    let tmp = a.__proto__,
      O = b.prototype;
    while (tmp) {
      if (tmp == O) {
        return true;
      }
      tmp = tmp.__proto__;
    }
    return false;
  } catch (err) {
    return false;
  }
}
