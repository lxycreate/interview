function colorTransform(color) {
    let arr = color.split(''), len = arr.length, nums = [];
    for (let i = 1; i < len; i += 2) {
        let num1 = calc(`${arr[i]}`, 1), num2 = calc(`${arr[i + 1]}`, 0);
        nums.push(num1 + num2);
    }
    return `rgb(${nums.join(',')})`
}

function calc(str, index) {
    let base = 1;
    if (index === 1) {
        base = 16;
    }
    let t = parseInt(str);
    if (Number.isNaN(t)) {
        if (str == 'A') {
            return 10 * base;
        } else if (str == 'B') {
            return 11 * base;
        } else if (str == 'C') {
            return 12 * base;
        } else if (str == 'D') {
            return 13 * base;
        } else if (str == 'E') {
            return 14 * base;
        } else if (str == 'F') {
            return 15 * base;
        }
    } else {
        return t * base;
    }
}

console.log(colorTransform('#C1C1C1'))