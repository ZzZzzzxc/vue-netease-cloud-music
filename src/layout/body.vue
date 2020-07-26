<template>
  <div class="container">
    <LayoutMenu />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import LayoutMenu from "./menu";
export default {
  name: "LayoutBody",
  components: { LayoutMenu }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 64px);
  .content {
    width: 100%;
    overflow-y: scroll;
  }
}
</style>
