<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="test">
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
    </div>-->
    <visualization></visualization>
    <span>{{now}}</span>
  </div>
</template>

<script>
import Visualization from "./views/visualization/visualization";
export default {
  name: "App",
  components: {
    Visualization,
  },
  data() {
    return {
      updateMsg: false,
    };
  },
  computed: {
    now() {
      if (this.updateMsg) {
        this.editUpdateMsg();
        return new Date();
      } else {
        this.editUpdateMsg();
        return new Date();
      }
    },
  },
  mounted() {},
  methods: {
    editUpdateMsg() {
      setTimeout(() => {
        this.updateMsg = !this.updateMsg;
      }, 1000);
    },
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
