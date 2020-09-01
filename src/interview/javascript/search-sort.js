/**
 * @Description: 排序查找
 * @Author: lixianying
 * @Date: 2020-06-24
 */
/**
 * 快排
 */
function quickSort(arr, left, right) {
  if (left < right) {
    let i = left, j = right, tmp = arr[i];
    while (i < j) {
      while (i < j && arr[j] >= tmp) {
        --j;
      }
      if (i < j) {
        arr[i] = arr[j];
      }
      while (i < j && arr[i] <= tmp) {
        ++i;
      }
      if (i < j && arr[i] > tmp) {
        arr[j] = arr[i];
      }
    }
    arr[i] = tmp;
    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right);
  }
}

/**
 * 二分查找 
 */
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > target) {
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

/**
 * 归并排序 
 */
function mergeSort(arr) {  //采用自上而下的递归方法
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(arrLeft, arrRight) {
  let i = 0, j = 0, lenLeft = arrLeft.length - 1, lenRight = arrRight.length - 1, result = [];
  while (i <= lenLeft && j <= lenRight) {
    if (arrLeft[i] < arrRight[j]) {
      result.push(arrLeft[i++]);
    } else {
      result.push(arrRight[j++]);
    }
  }
  while (i <= lenLeft) {
    result.push(arrLeft[i++]);
  }

  while (j <= lenRight) {
    result.push(arrRight[j++]);
  }

  return result;
}

/**
 * 洗牌算法
 */
function shuffle(arr) {
  let len = arr.length - 1;
  while (len) {
    let idx = Math.floor(Math.random() * len);
    [arr[len], arr[idx]] = [arr[idx], arr[len]];
    --len;
  }
}

let arrList = [];
for (let i = 0; i <= 54; ++i) {
  arrList.push(i)
}

shuffle(arrList);

/**
 * 查找树中的节点，包括它的父节点 
 */
function search(arr, target, path, result) {
  path = path ? JSON.parse(JSON.stringify(path)) : [];
  let len = arr.length;
  for (let i = 0; i < len; ++i) {
    if (arr[i].id == target) {
      path.push({ ...arr[i], children: [] })
      path.forEach(item => {
        result.push(item)
      });
      return;
    } else if (Array.isArray(arr[i].children) && arr[i].children.length) {
      let temp = [...path];
      temp.push({ ...arr[i], children: [] })
      search(arr[i].children, target, temp, result)
    }
  }
  return result;
}
let data = [{
  id: 1,
  label: '一级 1',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2'
  }]
}]
let result = search(data, 10, [], []);
console.log(result);
// let len = result.length;
// for (let i = 0; i < len; ++i) {
//   result[i + 1] && result[i].children.push(result[i + 1])
// }

/**
 * 实现继承
 */
function Parent(name) {
  this.name = name;
}

Parent.prototype.say = function () {
  console.log(this.name)
}

function Children(name) {
  Parent.call(this, name)
}

Children.prototype = Object.create(Parent.prototype);
Children.prototype.constructor = Children;

/**
 * 合并两个有序数组 
 */
function union(arr, arr2) {
  let len = arr.length, len2 = arr2.length, i = 0, j = 0, result = [];
  while (i < len && j < len2) {
    if (arr[i] < arr2[j]) {
      result.push(arr[i++]);
    } else if (arr2[j] < arr[i]) {
      result.push(arr2[j++]);
    }
  }
  while (i < len) {
    result.push(arr[i++]);
  }
  while (j < len2) {
    result.push(arr2[j++]);
  }
  return result;
}

// console.log(union([1, 2, 3, 4, 5], [9, 10]))

/**
 * 全排列 
 */
function full(arr, path, result) {
  path = path || [];
  let len = arr.length, temp = arr.filter(item => {
    return !(path.filter(num => {
      return num == item
    }).length);
  });
  for (let i = 0; i < len; ++i) {
    if (len > 1) {
      full(temp.filter(item => { return item !== arr[i] }), [...path, arr[i]], result)
    } else {
      result.push([...path, arr[i]])
    }
  }
  return result;
}

// console.log(full([1, 2, 3, 4], [], []))
