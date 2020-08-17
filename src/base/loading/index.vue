<template>
  <div class="z-loading-wrap" :style="customStyle">
    <div class="z-loading-content-wrap"><slot /></div>
    <div class="z-loading" v-if="loading">
      <div
        class="loader"
        :style="{ height: `${width}px`, width: `${width}px` }"
      />
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
    loading: {
      type: Boolean,
      required: true
    },
    customStyle: Object
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.z-loading-wrap {
  position: relative;
  .z-loading-content-wrap {
    position: relative;
  }
  .z-loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    display: block;
    width: 100%;
    height: 100%;
    .loader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid $blue;
      border-radius: 50%;
      animation: loading 1.2s infinite linear;
      @keyframes loading {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
