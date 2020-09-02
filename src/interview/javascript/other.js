/**
 * @Description: 其他
 * @Author: lixianying
 * @Date: 2020-09-02
 */
/**
 * 字符串逆序
 */
function reverse(str) {
  str = str.split('');
  let len = str.length, mid = len % 2 == 0 ? (len - 2) / 2 : Math.floor(len / 2);
  for (let i = 0; i <= mid; ++i) {
    [str[i], str[len - 1 - i]] = [str[len - 1 - i], str[i]]
  }
  return str.join('');
}

function reverse2(str) {
  return str.split('').reverse().join('')
}

// console.log(reverse('1'))
// console.log(reverse('123'))
function curry(fn) {
  // 缓存除第一个参数的所有参数
  let args = [];
  let _fn = function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    } else {
      args.push(...arguments);
      return _fn
    }
  }
  return _fn
}

function sum(a, b) {
  return a + b;
}

let newSum = curry(sum);
console.log(newSum(1)(2)(3)(4)())

let a = /b/i; let b = /b/i;
console.log(typeof a)
console.log(a == b)
console.log(a === b)