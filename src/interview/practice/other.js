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

function testQuickSort(a, left, right) {
  let i = left, j = right;
  if (i < j) {
    let tmp = a[i];
    while (i < j) {
      while (i < j && a[j] >= tmp) {
        --j;
      }
      if (i < j) {
        a[i] = a[j];
      }
      while (i < j && a[i] <= tmp) {
        ++i;
      }
      if (i < j) {
        a[j] = a[i];
      }
    }
    a[i] = tmp;
    testQuickSort(arr, left, i - 1);
    testQuickSort(arr, i + 1, right)
  }
  return arr;
}

// let arr = [9, 0, 8, 7, 6, 5, 4, 3, 2, 1];
// console.log(testQuickSort(arr, 0, arr.length - 1))


function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let mid = Math.floor(len / 2), arr1 = arr.slice(0, mid), arr2 = arr.slice(mid);
  return merge(mergeSort(arr1), mergeSort(arr2));
}

function merge(arr1, arr2) {
  let len1 = arr1.length, len2 = arr2.length, i = 0, j = 0, result = [];
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      ++i;
    } else if (arr2[j] < arr1[i]) {
      result.push(arr2[j]);
      ++j;
    }
  }
  while (i < len1) {
    result.push(arr1[i]);
    ++i;
  }
  while (j < len2) {
    result.push(arr2[j]);
    ++j;
  }
  return result;
}

/**
 * 插入排序 
 */
function insertMerge(arr) {
  let len = arr.length;
  for (let i = 0; i < len; ++i) {
    let tmp = arr[i], j;
    for (j = i; j > 0 && arr[j - 1] > tmp; --j) {
      arr[j] = arr[j - 1];
    }
    arr[j] = tmp;
  }
  return arr;
}

let temp = insertMerge([9,5,7,10,1,2])
console.log(temp)