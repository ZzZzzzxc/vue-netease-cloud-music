<template>
  <div class="card-wrapper" :style="{ width: `${width}px` }">
    <div class="content" :style="{ height: `${height}px` }">
      <div class="header text">{{ count }}</div>
      <img class="img" :src="imgUrl" alt="" />
      <div class="bottom text">{{ author }}</div>
    </div>
    <div class="footer">{{ footer }}</div>
  </div>
</template>

<script>
export default {
  name: "SongSheetCard",
  props: {
    height: {
      default: 180,
      type: Number,
    },
    width: {
      default: 180,
      type: Number,
    },
    count: {
      default: "",
      type: String,
    },
    imgUrl: {
      default: "",
      type: String,
    },
    author: {
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
.card-wrapper {
  font-size: $font-size-sm;
  .content {
    position: relative;
    overflow: hidden;
    margin-bottom: 12px;
    .text {
      color: $white;
      width: 100%;
      line-height: 1.8;
      @include text-ellipsis();
      padding: 0 6px;
    }
    .header {
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;
      background-color: rgba($color: #000000, $alpha: 0.4);
    }
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .bottom {
      position: absolute;
      bottom: 0;
    }
  }
  .footer {
    width: 100%;
  }
}
</style>
