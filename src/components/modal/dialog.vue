<template>
  <el-dialog
    v-stop-click-propagation:[stopPropagation]
    :visible.sync="visible"
    :title="title"
    :custom-class="`${popType} ${customClass}`"
    :width="width"
    :top="top"
    :modal="modal"
    :show-close="showClose"
    :close-on-click-modal="closeOnClickModal"
    :close-onpress-escape="showClose"
    :destroy-on-close="false"
    :lock-scroll="false"
    :before-close="handleBeforeClose"
    :fullscreen="fullscreen"
    @closed="handleClosed"
    @close="handleClose"
    @open="handleOpen"
    @opened="handleOpened"
  >
    <component
      ref="comp"
      :is="compName"
      :visible="visible"
      :fullscreen="fullscreen"
      v-bind="innerProps"
      @close="handleCmptClose"
      @update="handleCmptUpdate"
    ></component>
    <!-- 标题 -->
    <template slot="title">
      <div class="dialog-header">
        {{ title }}
      </div>
      <el-tooltip
        class="toggle-fullscreen"
        v-if="showFullscreen"
        :key="`${fullscreen}`"
        :content="fullscreenText"
        placement="top"
        :disabled="!fullscreenText"
      >
        <span @click="fullscreen = !fullscreen">
          <i class="el-icon-sort"></i>
        </span>
      </el-tooltip>
    </template>
    <!-- 底部 -->
    <template slot="footer" v-if="showDialogFooter">
      <slot name="footer">
        <el-button
          class="footer-button"
          v-if="showCancelButton"
          @click="handleCancel"
          >取消</el-button
        >
        <el-button
          v-if="showCancelButton"
          type="primary"
          :class="`footer-button ${confirmClass}`"
          :loading="confirmButtonLoading"
          :disabled="confirmButtonDisabled"
          @click="handleConfirm"
          >确定</el-button
        >
      </slot>
    </template>
  </el-dialog>
</template>
<script>
import Vue from "vue";

Vue.directive("stop-click-propagation", {
  inserted: (el, binding) => {
    if (binding.arg === "true") {
      el.addEventListener("click", (e) => e.stopPropagation());
    }
  },
});
export default {
  components: {},
  props: {
    compName: String,
    title: { type: String, default: "" },
    width: { type: String, default: "50%" },
    height: { default: null },
    closeOnClickModal: { type: Boolean },
    closeOnRouterChange: { type: Boolean, default: true },
    showClose: { type: Boolean, default: true },
    showFullscreen: { type: Boolean, default: false },
    fullscreenOnText: { type: String, default: "" },
    fullscreenOffText: { type: String, default: "" },
    showFooter: { type: Boolean, default: true },
    innerProps: Object,
    cancelText: { type: String, default: "" },
    confirmText: { type: String, default: "" },
    confirmClass: { type: String, default: "" },
    showCancelButton: { type: Boolean, default: true },
    showConfirmButton: { type: Boolean, default: true },
    popType: { type: String, default: "dialog" },
    customClass: { type: String, default: "" },
    wrapperStyle: { type: Object, default: () => ({}) },
    top: { type: String, default: "15vh" },
    modal: { type: Boolean, default: true },
    onClose: { type: Function, default: null },
    onClosed: { type: Function, default: null },
    onOpen: { type: Function, default: null },
    onOpened: { type: Function, default: null },
    afterClose: { type: Function, default: null },
    onCancel: { type: Function, default: null },
    onConfirm: { type: Function, default: null },
    onUserClose: { type: Function, default: null },
    stopPropagation: { type: String, default: "" },
  },
  data() {
    return {
      visible: false,
      confirmButtonLoading: false,
      confirmButtonDisabled: false,
      startClose: false,
      fullscreen: false,
    };
  },
  computed: {
    showDialogFooter() {
      return this.popType === "dialog" && this.showFooter;
    },
    fullscreenText() {
      return this.fullscreen ? this.fullscreenOnText : this.fullscreenOffText;
    },
  },
  watch: {
    $route() {
      if (this.closeOnRouterChange) {
        this.handleCmptClose({ immediately: true });
      }
    },
  },
  mounted() {
    this.visible = true;
    this.updateStyle();
  },
  methods: {
    handleOpen() {
      this.onOpen && this.onOpen();
    },
    handleOpened() {
      this.onOpened && this.onOpened();
    },
    handleClose() {
      this.onClose && this.onClose();
    },
    handleClosed() {
      this.onClosed && this.onClosed();
      this.innerAfterClose();
    },
    handleCmptClose({ immediately = false } = {}) {
      if (this.startClose) {
        return;
      }
      this.startClose = true;
      this.visible = false;
      if (immediately) {
        this.innerAfterClose();
      }
    },
    innerAfterClose() {
      const { $el } = this;
      if ($el && $el.parentNode) {
        $el.parentNode.removeChild($el);
      }
      this.$destroy();
    },
    handleConfirm() {
      if (this.onConfirm) {
        this.onConfirm();
      } else if (this.$refs.comp) {
        this.$refs.comp.$emit("confirm");
      }
    },
    handleCancel() {
      if (this.onCancel) {
        this.onCancel(this.handleCmptClose);
      } else {
        this.handleCmptClose();
      }
    },
    handleBeforeClose(done) {
      if (this.onUserClose) {
        this.onUserClose(done);
      } else {
        this.handleCmptClose();
      }
    },
    handleCmptUpdate(data) {
      Object.assign(this, data);
      this.updateStyle();
    },
    updateStyle() {
      const dialog = this.$el.querySelector(".el-dialog");
      dialog && Object.assign(dialog.style, this.wrapperStyle);
    },
  },
};
</script>
<style lang="less" scoped>
.dialog-header {
  font-size: 14px;
  font-weight: 700;
}
.toggle-fullscreen {
  position: absolute;
  right: 52px;
  top: 20px;
  cursor: pointer;
}
/deep/ .popup.el-dialog {
  overflow: hidden;
  background: transparent;
  .el-dialog__header {
    display: none;
    padding: 20px;
  }

  .el-dialog__body {
    padding: 0;
    height: 100%;
  }
}
/deep/ .el-dialog {
  &__header {
    padding: 24px 24px 16px 24px;
  }
  &__headerbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    right: 20px;
    top: 20px;
    width: 16px;
    height: 16px;
    i {
      font-size: 16px;
    }
  }
  &__body {
    padding: 0 20px 16px;
  }
  &__footer {
    padding: 0 24px 24px 24px;
  }
  .el-radio__label,
  .el-checkbox__label {
    font-size: 12px;
  }
}
.footer-button {
  padding: 6px 16px;
  &.el-button--primary {
    padding: 7px 16px;
  }
  /deep/ &.is-loading {
    position: relative;
    > .el-icon-loading {
      position: absolute;
      margin: 0;
      top: calc(50%- 7px);
      left: calc(50% - 8px);
    }
    > span {
      margin-left: 0;
      visibility: hidden;
    }
  }
}
</style>