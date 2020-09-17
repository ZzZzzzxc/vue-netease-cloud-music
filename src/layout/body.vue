<template>
  <div class="container">
    <layout-menu></layout-menu>
    <div class="content" id="content__ref">
      <router-view :key="true"></router-view>
    </div>
  </div>
</template>

<script>
import LayoutMenu from "./menu";
export default {
  name: "LayoutBody",
  components: { LayoutMenu },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 64px);
  padding-top: $header-height;
  .content {
    width: 100%;
    overflow-y: scroll;
    padding: 0 36px;
  }
}
</style>
