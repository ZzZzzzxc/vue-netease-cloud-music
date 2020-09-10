<template>
  <transition name="fade">
    <div class="z-dialog-wrap" v-show="visible">
      <transition name="dialog">
        <div
          class="z-dialog"
          :class="customClass"
          v-show="visible"
          :style="dialogStyle"
        >
          <div class="header-wrap">
            <div>
              <slot name="header">
                <div>
                  {{ title }}
                </div>
              </slot>
            </div>
            <div class="close-wrap" @click.stop="closeDialog">
              <img :src="require(`@/assets/icon/close.png`)" />
            </div>
          </div>
          <div class="body-wrap">
            <slot></slot>
          </div>
          <div class="footer-wrap">
            <slot name="footer"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ZDialog",
  model: {
    prop: "visible",
    event: "visibleChange",
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      default: "50%",
    },
    title: {
      type: String,
      default: "",
    },
    handleClose: Function,
    customClass: String,
  },
  data() {
    return {};
  },
  computed: {
    dialogStyle() {
      const { width } = this;
      return {
        width,
      };
    },
  },
  watch: {
    visible(v) {
      console.log(v);
    },
  },
  methods: {
    closeDialog() {
      this.handleClose
        ? this.handleClose()
        : this.$emit("visibleChange", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.z-dialog-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2050;
  .z-dialog {
    position: relative;
    margin: 15vh auto 0 auto;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    .header-wrap {
      padding: 20px 20px 10px;
      display: flex;
      justify-content: space-between;
      .close-wrap {
        cursor: pointer;
        width: 20px;
        height: 20px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .body-wrap {
      padding: 30px 20px;
    }
    .footer-wrap {
      padding: 10px 20px 20px;
    }
  }
}
</style>
