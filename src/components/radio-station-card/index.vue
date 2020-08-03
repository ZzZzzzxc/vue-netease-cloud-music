<template>
  <div class="radio-station-card" :style="{ width: `${width}px` }">
    <div class="content" :style="{ height: `${height}px` }">
      <div class="img" v-lazy:background-image="imgUrl"></div>
      <div class="bottom">{{ title }}</div>
    </div>
    <div class="footer">{{ footer }}</div>
  </div>
</template>

<script>
export default {
  name: "RadioStationCard",
  props: {
    height: {
      default: 140,
      type: Number,
    },
    width: {
      default: 140,
      type: Number,
    },
    imgUrl: {
      default: "",
      type: String,
    },
    title: {
      default: "",
      type: String,
    },
    footer: {
      default: "",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-station-card {
  font-size: $font-size-sm;
  .content {
    position: relative;
    overflow: hidden;
    margin-bottom: 12px;
    border-radius: 8px;
    .header {
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;
      background-color: rgba($color: #000000, $alpha: 0.4);
      z-index: 100;
    }
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .bottom {
      color: $white;
      width: 100%;
      line-height: 1.8;
      @include text-ellipsis();
      padding: 0 6px;
      position: absolute;
      bottom: 0;
    }
  }
  .footer {
    width: 100%;
  }
}
</style>
