<template>
  <div class="header">
    <div class="left">
      <img class="logo item" :src="require(`@/assets/logo.jpg`)" />
      <div class="title item">Music</div>
      <div class="item"><HistoryControl /></div>
      <div class="item"><Search /></div>
    </div>
    <div class="right">
      <div class="item"><Theme /></div>
      <div class="item"><User /></div>
    </div>
  </div>
</template>

<script>
import { HistoryControl, Search, User, Theme } from "@/components";
export default {
  name: "Header",
  components: { HistoryControl, Search, User, Theme },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: $header-height;
  padding: 0 54px;
  background-color: $theme-color;
  color: $white;
  z-index: $header-index;
  .left {
    height: $header-height;
    line-height: $header-height;
    display: flex;
    flex: 1;
    .logo {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    .title {
      font-weight: bold;
      font-size: $font-size-lg;
    }
  }
  .right {
    height: $header-height;
    line-height: $header-height;
    display: flex;
  }
  .item {
    cursor: pointer;
    margin: 0 24px;
  }
}
</style>
