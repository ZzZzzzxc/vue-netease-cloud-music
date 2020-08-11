<template>
  <div class="footer"><MiniPlayer /></div>
</template>

<script>
import { MiniPlayer } from "@/components";
export default {
  name: "Footer",
  components: { MiniPlayer },
};
</script>

<style lang="scss" scoped>
.footer {
  height: $footer-height;
}
</style>
