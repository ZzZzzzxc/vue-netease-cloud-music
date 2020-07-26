<template>
  <div class="z-swiper-wrapper">
    <div class="z-swiper">
      <slot />
    </div>
    <div class="z-swiper-control">
      <div
        class="z-swiper-control__left z-swiper-control__trigger"
        @click="prev"
      >
        prev
      </div>
      <div
        class="z-swiper-control__right z-swiper-control__trigger"
        @click="next"
      >
        next
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
export default {
  name: "ZSwiper",
  data() {
    return {
      items: [],
      activeIndex: -1,
    };
  },
  computed: {},
  watch: {
    activeIndex() {
      this.resetItemPosition();
    },
  },
  methods: {
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
    this.activeIndex = 1;
  },
};
</script>

<style lang="scss" scoped>
.z-swiper-wrapper {
  width: 500px;
  margin: 0 auto;
  position: relative;
  &:hover {
    .z-swiper-control {
      display: block;
    }
  }
  .z-swiper {
    position: relative;
    height: 240px;
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
    bottom: -10px;
    display: flex;
    &__item {
      width: 28px;
      height: 4px;
      cursor: pointer;
      background: $grey;
      margin: 0 10px;
      &__active {
        background: $black;
      }
    }
  }
}
</style>
