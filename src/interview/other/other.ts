function compare(old = [], argments = []) {
  const len = Math.max(old.length, argments.length);
  for (let i = 0; i < len; ++i) {
    if (old[i] !== argments[i]) {
      return false;
    }
  }
  return true;
}
export function memoize(fn) {

  let lastArguments = [];
  let value = undefined;

  return function (argments = []) {
    if (compare(lastArguments, argments)) {
      console.log('old')
      return value;
    }
    value = fn(...argments);
    lastArguments = argments;
    console.log('new')
    return value;
  }
}