<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="test">
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
    </div>
  </div>
</template>

<script>
var obj = {
  a: function () {
    console.log(this);
  },
};
var temp = obj.a;
temp();
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    window.jsonpCount = 0;
    function myJsonp(options) {
      let id = window.jsonpCount++,
        cbKey = `jsonpCb${id}`,
        script,
        timer;
      const { url, data = {}, timeout = 5000 } = options;

      function formateUrl() {
        let params = [];
        Object.keys(data).forEach((key) => {
          params.push(`${key}=${data[key]}`);
        });
        params.push(`jsonpCallback=${cbKey}`);
        return `${url}?${params.join("&")}`;
      }

      function request() {
        let realUrl = formateUrl();
        script = document.createElement("script");
        script.src = realUrl;
        document.body.appendChild(script);
      }

      function clear() {
        timer = null;
        window[cbKey] = null;
        script && script.parentNode.removeChild(script);
        script = undefined;
      }

      function error(reject) {
        timer = setTimeout(() => {
          reject("time out");
          clear();
        }, timeout);
      }

      return new Promise((resolve, reject) => {
        request();
        window[cbKey] = function (res) {
          resolve(res);
          clear();
        };
        error(reject);
      });
    }

    myJsonp({
      url: "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
      cbkey: "jsonpCallback",
      data: {
        g_tk: 1928093487,
        inCharset: "utf-8",
        outCharset: "utf-8",
        notice: 0,
        format: "jsonp",
        platform: "h5",
        uin: 0,
        needNewCode: 1,
      },
      // QQ音乐接口Jsonp字段
    }).then(
      (res) => {
        console.log(res);
      },
      (res) => {
        console.log(res);
      }
    );
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .test {
    display: flex;
    height: 50px;

    .child {
      width: 33.3%;
    }
  }
}
</style>
