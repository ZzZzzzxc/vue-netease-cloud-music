<template>
  <div class="app-wrap">
    <LayoutHeader />
    <LayoutBody />
    <LayoutFooter />
    <Playlist />
    <CurrentSong />
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutBody from "./body";
import LayoutFooter from "./footer";
import { Playlist, CurrentSong } from "@/components";
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutFooter, LayoutBody, Playlist, CurrentSong },
};
</script>

<style lang="scss" scoped>
.app-wrap {
  height: 100vh;
}
</style>
