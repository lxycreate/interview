// console.log(obj3);

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("微二");
  await async3();
  console.log("微四");
  await async4();
  console.log("微五");
}
async function async1Copy() {
  return new Promise((resolve) => {
    console.log("async1 start");
    async2();
    resolve();
  }).then(() => {
    new Promise((resolve) => {
      console.log("微二");
      async3();
      resolve();
    }).then(() => {
      new Promise((resolve) => {
        console.log("微四");
        async4();
        resolve();
      }).then(() => {
        new Promise((resolve) => {
          console.log("微五");
          resolve();
        });
      });
    });
  });
}

async function async2() {
  console.log("async2");
}
async function async3() {
  console.log("async3");
}
async function async4() {
  console.log("async4");
}

function exeIndex() {
  new Promise(function (resolve) {
    console.log("promise1");
    resolve();
  }).then(function () {
    console.log("微一"); // 微一
  });
  async1Copy();
  async1();
  new Promise(function (resolve) {
    console.log("promise2");
    resolve();
  }).then(function () {
    console.log("微三"); // 微一
  });
  new Promise(function (resolve) {
    console.log("promise3");
    resolve();
  }).then(function () {
    console.log("微三+"); // 微一
  });
  function test() {
    setTimeout(() => {
      console.log(9);
      Promise.resolve().then((res) => {
        console.log(99);
      });
    });
    setTimeout(() => {
      console.log(8);
      Promise.resolve().then((res) => {
        console.log(88);
      });
    });
  }
  test();
  Promise.resolve().then((res) => {
    console.log(77);
  });
}