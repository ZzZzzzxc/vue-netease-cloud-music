<template>
  <div class="app-wrap">
    <LayoutHeader />
    <LayoutBody />
    <LayoutFooter />
    <Playlist />
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutBody from "./body";
import LayoutFooter from "./footer";
import { Playlist } from "@/components";
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutFooter, LayoutBody, Playlist }
};
</script>

<style lang="scss" scoped>
.app-wrap {
  height: 100vh;
}
</style>
