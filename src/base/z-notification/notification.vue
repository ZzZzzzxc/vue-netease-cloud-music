<template>
  <transition name="z-notification-fade">
    <div
      :class="[prefixClass, `${prefixClass}__${horizontalClass}`]"
      v-if="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
    >
      <div :class="`${prefixClass}-header`">
        <h1 class="title">{{ title }}</h1>
        <div class="close" @click.stop="handleClose">
          <img :src="require(`@/assets/icon/close.png`)" />
        </div>
      </div>
      <div :class="`${prefixClass}-content`" v-if="message">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
const prefixClass = `z-notification`;
export default {
  name: "ZNotification",
  data() {
    return {
      prefixClass,
      title: "",
      message: "",
      duration: 3000,
      visible: false,
      verticalOffset: 0,
      position: "top-right",
      onClose: () => {},
      timer: null,
    };
  },
  computed: {
    horizontalClass() {
      return this.position.indexOf("right") > -1 ? "right" : "left";
    },
    verticalProperty() {
      return /^top-/.test(this.position) ? "top" : "bottom";
    },
    positionStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`,
      };
    },
  },
  methods: {
    handleClose() {
      this.onClose();
      this.visible = false;
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.handleClose();
          }
        }, this.duration);
      }
    },
  },
  mounted() {
    this.startTimer();
  },
};
</script>

<style lang="scss" scoped>
.z-notification {
  @include box-shadow;
  clear: both;
  position: fixed;
  width: $notification-width;
  padding: $notification-padding;
  border-radius: 8px;
  background-color: $white;
  transition: 0.3s;
  overflow: hidden;
  z-index: $notification-index;
  font-size: $font-size;
  &__left {
    left: 16px;
  }
  &__right {
    right: 16px;
  }
  .z-notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 80%;
      @include text-ellipsis;
    }
    .close {
      width: 20%;
      cursor: pointer;
      img {
        float: right;
        width: 16px;
        height: 16px;
      }
    }
  }
  .z-notification-content {
    margin-top: 12px;
  }
}
</style>
