<template>
  <div class="z-loading-wrap" :style="customStyle">
    <div class="z-loading-content-wrap"><slot></slot></div>
    <div class="z-loading" v-if="loading">
      <div class="loader" :style="loaderStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZLoading",
  props: {
    width: {
      type: Number,
      default: 40
    },
    color: String,
    loading: {
      type: Boolean,
      required: true
    },
    customStyle: Object
  },
  computed: {
    loaderStyle() {
      const { width, color } = this;
      return {
        height: `${width}px`,
        width: `${width}px`,
        border: `4px solid #f3f3f3`,
        borderTop: `4px solid ${color ? color : "#517eaf"}`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.z-loading-wrap {
  position: relative;
  .z-loading-content-wrap {
    position: relative;
  }
  .z-loading {
    @include abs-stretch;
    z-index: $loading-index;
    display: block;
    width: 100%;
    height: 100%;
    .loader {
      @include abs-center;
      border-radius: 50%;
      animation: rotate 1.2s infinite linear;
    }
  }
}
</style>
