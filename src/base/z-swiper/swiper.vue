<template>
  <div
    class="z-swiper-wrapper"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div class="z-swiper" :style="{ height: `${height}px` }">
      <slot></slot>
    </div>
    <div class="z-swiper-control">
      <div
        class="z-swiper-control__left z-swiper-control__trigger"
        @click="prev"
      >
        <img class="icon" :src="require(`@/assets/icon/arrow-left-bold.png`)" />
      </div>
      <div
        class="z-swiper-control__right z-swiper-control__trigger"
        @click="next"
      >
        <img
          class="icon"
          :src="require(`@/assets/icon/arrow-right-bold.png`)"
        />
      </div>
    </div>
    <div class="z-swiper-btn">
      <div
        class="z-swiper-btn__item"
        :class="[activeIndex === index ? `z-swiper-btn__item__active` : ``]"
        v-for="(item, index) in items"
        :key="index"
        @click="setActiveIndex(index)"
      ></div>
    </div>
  </div>
</template>

<script>
const WAIT = 2000;
export default {
  name: "ZSwiper",
  props: {
    height: {
      type: Number,
      default: 200,
    },
    auto: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      items: [],
      activeIndex: -1,
      timer: null,
    };
  },
  computed: {},
  watch: {
    activeIndex() {
      this.resetItemPosition();
    },
  },
  methods: {
    startTimer() {
      if (!this.auto) return;
      if (this.timer) this.clearTimer();
      this.timer = setInterval(this.next, WAIT);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    setActiveIndex(index) {
      this.activeIndex = index;
    },
    updateItems() {
      this.items = this.$children.filter(
        child => child.$options.name === "ZSwiperItem"
      );
    },
    getPrevKIndex(activeIndex = this.activeIndex) {
      let index = activeIndex - 1;
      return index < 0 ? this.items.length - 1 : index;
    },
    getNextIndex(activeIndex = this.activeIndex) {
      let index = activeIndex + 1;
      return index > this.items.length - 1 ? 0 : index;
    },
    prev() {
      this.activeIndex = this.getPrevKIndex();
    },
    next() {
      this.activeIndex = this.getNextIndex();
    },
    resetItemPosition() {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex);
      });
    },
  },
  mounted() {
    this.updateItems();
    this.activeIndex = 0;
    this.startTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
};
</script>

<style lang="scss" scoped>
.z-swiper-wrapper {
  margin: 0 auto;
  position: relative;
  &:hover {
    .z-swiper-control {
      display: block;
    }
  }
  .z-swiper {
    position: relative;
    overflow: hidden;
  }
  .z-swiper-control {
    display: none;
    width: 100%;
    height: 100%;
    color: $black;
    &__trigger {
      position: absolute;
      cursor: pointer;
      height: 90%;
      bottom: 0;
      width: 46px;
      z-index: $swiper-trigger-index;
      .icon {
        position: absolute;
        top: 42%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
      }
    }
    &__left {
      left: 0;
    }
    &__right {
      right: 0;
    }
  }
  .z-swiper-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
    display: flex;
    &__item {
      width: 28px;
      height: 4px;
      cursor: pointer;
      background: $grey;
      margin: 0 10px;
      &__active {
        background: $theme-color;
      }
    }
  }
}
</style>
