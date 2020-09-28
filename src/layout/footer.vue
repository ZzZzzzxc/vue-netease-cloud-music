<template>
  <div class="footer" id="footer__ref"><mini-player></mini-player></div>
</template>

<script>
import { MiniPlayer } from "@/components";
export default {
  name: "Footer",
  components: { MiniPlayer }
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  height: $footer-height;
  width: 100%;
  z-index: $footer-index;
  background-color: $white;
  @include box-shadow;
}
</style>
