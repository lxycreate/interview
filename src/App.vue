<script>
import Visualization from "./views/visualization/visualization";
import modal from "./components/modal/modal.js";
import { memoize, memoizeOne } from "./interview/other/other.ts";
export default {
  name: "App",
  components: {
    // Visualization,
  },
  data() {
    return {
      updateMsg: false,
      name: "9900k",
      age: 999,
      computeValue: () => {},
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
  mounted() {
    modal({
      content: Visualization,
    });
    this.computeValue = memoize(() => `${this.name}`);
    setTimeout(() => {
      this.name = "9900HF";
    });
    setTimeout(() => {
      this.age = 100;
    }, 1000);
    setTimeout(() => {
      this.age = 200;
    }, 3000);
  },
  render() {
    return (
      <div>
        {this.computeValue(this.name)}
        <div>{this.age}</div>
      </div>
    );
  },
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
