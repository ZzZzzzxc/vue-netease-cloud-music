<template>
  <div class="z-card-item" :style="{ width: `${width}px` }">
    <div
      class="z-card-item__content"
      :style="contentStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onClick"
    >
      <transition name="fade">
        <div class="extend" v-show="extendShow"><slot /></div>
      </transition>
      <transition name="fade">
        <div
          class="title text-line"
          v-if="title && titleShow"
          :style="titleStyle"
        >
          {{ title }}
        </div>
      </transition>
      <div class="label text-line" v-if="label" :style="labelStyle">
        {{ label }}
      </div>
    </div>
    <div class="z-card-item__footer"><slot name="footer" /></div>
  </div>
</template>

<script>
export default {
  name: "ZCardItem",
  props: {
    onClick: {
      default: () => {},
      type: Function,
    },
    image: {
      required: true,
      type: String,
    },
    height: {
      type: Number,
      default: 140,
    },
    width: {
      type: Number,
      default: 140,
    },
    label: {
      default: "",
      type: String,
    },
    labelPlacement: {
      default: "top",
      type: String,
      validator: value => ["top", "bottom"].indexOf(value) > -1,
    },
    labelAnimation: {
      default: true,
      type: Boolean,
    },
    title: {
      default: "",
      type: String,
    },
    titlePlacement: {
      default: "bottom",
      type: String,
      validator: value => ["top", "bottom"].indexOf(value) > -1,
    },
    extendAnimation: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      titleShow: !this.labelShow,
      extendShow: !this.extendAnimation,
      labelShow: !this.labelAnimation,
    };
  },
  watch: {
    labelShow(val) {
      this.titleShow = !val;
    },
  },
  computed: {
    contentStyle() {
      return {
        backgroundImage: `url(${this.image})`,
        backgroundSepeat: `no-repeat`,
        backgroundSize: `cover`,
        height: `${this.height}px`,
      };
    },
    titleStyle() {
      const style = {};
      style[this.titlePlacement] = 0;
      return style;
    },
    labelStyle() {
      const style = {};
      style[this.labelPlacement] = this.labelShow ? 0 : `-100%`;
      return style;
    },
  },
  methods: {
    onMouseEnter() {
      if (this.extendAnimation) {
        this.extendShow = true;
      }
      if (this.labelAnimation) {
        this.labelShow = true;
      }
    },
    onMouseLeave() {
      if (this.extendAnimation) {
        this.extendShow = false;
      }
      if (this.labelAnimation) {
        this.labelShow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.z-card-item {
  margin: 0 12px 16px 0;
  overflow: hidden;
  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    .extend {
      position: absolute;
    }
    .text-line {
      position: absolute;
      color: $white;
      width: 100%;
      padding: 0 6px;
      background: rgba($color: #000000, $alpha: 0.4);
    }
    .title {
      height: 30px;
      line-height: 30px;
      @include text-ellipsis();
    }
    .label {
      transition: 0.4s;
      line-height: 1.8;
      font-size: $font-size-sm;
      @include text-ellipsis-multi(2);
    }
  }
  &__footer {
    margin-top: 16px;
    font-size: $font-size;
    width: 100%;
  }
}
</style>
