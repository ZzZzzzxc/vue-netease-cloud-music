<template>
  <div class="z-swiper__item" :style="itemStyle" v-show="ready">
    <div class="z-swiper__item__mask" v-show="!active"></div>
    <slot></slot>
  </div>
</template>

<script>
const CARD_SCALE = 0.83;
export default {
  name: "ZSwiperItem",
  data() {
    return {
      ready: false,
      active: false,
      translate: 0,
      scale: 1,
      inStage: false
    };
  },
  computed: {
    itemStyle() {
      const value = `translateX(${this.translate}px) scale(${this.scale})`;
      let zIndex = 0;
      if (this.active) {
        zIndex = 4;
      } else if (this.inStage) {
        zIndex = 3;
      } else {
        zIndex = 0;
      }
      const style = {
        transform: value,
        zIndex
      };
      return style;
    }
  },
  methods: {
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },
    calcCardTranslate(index, activeIndex) {
      const parentWidth = this.$parent.$el.offsetWidth;
      if (this.inStage) {
        return (
          (parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4
        );
      } else if (index < activeIndex) {
        return (-(1 + CARD_SCALE) * parentWidth) / 4;
      } else {
        return ((3 + CARD_SCALE) * parentWidth) / 4;
      }
    },
    translateItem(index, activeIndex) {
      const length = this.$parent.items.length;
      if (index !== activeIndex && length > 2) {
        index = this.processIndex(index, activeIndex, length);
      }
      this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
      this.active = index === activeIndex;
      this.translate = this.calcCardTranslate(index, activeIndex);
      this.scale = this.active ? 1 : CARD_SCALE;
      this.ready = true;
    }
  },
  created() {
    this.$parent && this.$parent.updateItems();
  },
  destroyed() {
    this.$parent && this.$parent.updateItems();
  }
};
</script>

<style lang="scss" scoped>
.z-swiper__item {
  transition: 0.3s;
  text-align: center;
  width: 50%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0;
  &__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $white;
    opacity: 0.24;
    transition: 0.3s;
  }
}
</style>
