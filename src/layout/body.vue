<template>
  <div class="container">
    <LayoutMenu />
    <div class="content" v-el="setContent">
      <router-view />
    </div>
  </div>
</template>

<script>
import LayoutMenu from "./menu";
import { domMixin } from "@/utils";
export default {
  name: "LayoutBody",
  mixins: [domMixin],
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
