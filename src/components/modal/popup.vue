<template>
  <transition name="fade">
    <div class="popup-wrapper" v-show="visible" :class="{ showMask }">
      <div
        class="mask"
        v-if="!noMask"
        :style="{ opacity: showMask ? 0.5 : 0 }"
        @click="handleClickMask"
      ></div>
      <transition :name="animationType" @after-enter="hanldeAfterEnter">
        <component
          class="comp-wrapper"
          ref="ctnRef"
          v-show="showContent"
          :is-enter="isEnter"
          :is="compName"
          v-bind="innerProps"
          @close="handleClose"
        ></component>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    compName: String,
    showMask: { type: Boolean, default: true },
    noMask: { type: Boolean, default: false },
    closeOnClickModal: { type: Boolean, default: true },
    content: { type: Object },
    innerProps: { type: Object },
    animationType: String,
    onClose: Function,
  },
  data() {
    return {
      visible: false,
      showContent: !this.animationType,
      // 动画结束标志，传递给业务组件，可以用于控制业务组件内部主要组件渲染和逻辑执行时机
      // 防止业务组件渲染阻断主线程
      isEnter: !this.animationType,
    };
  },
  watch: {
    $route() {
      this.handleClose();
    },
  },
  methods: {
    handleShow() {
      this.visible = true;
      this.$nextTick(() => {
        this.showContent = true;
      });
    },
    handleClickMask() {
      const { closeOnClickModal } = this;
      closeOnClickModal && this.handleClose();
    },
    handleClose() {
      this.onClose?.(this);
      this.visible = false;
      this.showContent = !this.animationType;
      const { ctnRef } = this.$refs;
      ctnRef && ctnRef?.afterClose();
      setTimeout(this.afterClose, 800);
    },
    afterClose() {
      const { $el } = this;
      if ($el.parentNode) {
        $el.parentNode.removeChild($el);
      }
      this.$destroy();
    },
    handleAfterEnter() {
      this.isEnter = true;
    },
  },
};
</script>
<style lang="less" scoped>
.popup-wrapper {
  position: absolute;
  z-index: 2000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  &.showMask {
    overflow: hidden;
  }
  &.mask {
    background-color: #000000;
    pointer-events: auto;
  }
  .comp-wrapper {
    pointer-events: auto;
  }
}
.fade {
  &-enter {
    opacity: 0;
  }
  &-enter-active {
    transition: opacity 400ms;
  }
  &-leave-active {
    transition: opacity 400ms;
  }
}
</style>