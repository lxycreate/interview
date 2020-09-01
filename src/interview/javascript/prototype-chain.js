/**
 * @Description: 原型链
 * @Author: lixianying
 * @Date: 2020-06-24
 */
Function.prototype.myCall = function (thisArg, ...reset) {
  let contxt = thisArg || window, key = Symbol();
  contxt[key] = this;
  let result = contxt[key](...reset);
  return result;
}

Function.prototype.myApply = function (thisArg, reset) {
  let contxt = thisArg || window, key = Symbol();
  contxt[key] = this;
  let result = contxt[key](...reset);
  return result;
}

Function.prototype.myBind = function (thisArg, ...reset) {
  let contxt = thisArg || window, key = Symbol();
  contxt[key] = this;
  let result = contxt[key](...reset);
  return function () {
    return result;
  }
}
function test(prop) {
  console.log(this.name)
  console.log(`test - ${prop}`)
  return 99;
}

test.myCall({ name: 'myCall' }, 'myCall')

console.log(test.myApply({ name: 'myApply' }, ['myApply']))

console.log(test.myBind({ name: 'myBind' }, 'myBind')())