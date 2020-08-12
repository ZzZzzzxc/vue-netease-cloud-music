<template>
  <div class="footer" v-el="setFooter"><MiniPlayer /></div>
</template>

<script>
import { MiniPlayer } from "@/components";
import { domMixin } from "@/utils";
export default {
  name: "Footer",
  mixins: [domMixin],
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
