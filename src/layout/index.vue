<template>
  <div class="app-wrap">
    <layout-header></layout-header>
    <layout-body></layout-body>
    <layout-footer></layout-footer>
    <playlist></playlist>
    <current-song></current-song>
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutBody from "./body";
import LayoutFooter from "./footer";
import { Playlist, CurrentSong } from "@/components";
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutFooter, LayoutBody, Playlist, CurrentSong }
};
</script>

<style lang="scss" scoped>
.app-wrap {
  height: 100vh;
}
</style>
