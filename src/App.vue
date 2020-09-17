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
  </div>
</template>

<script>
import Visualization from "./views/visualization/visualization";
export default {
  name: "App",
  components: {
    Visualization,
  },
  mounted() {},
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
