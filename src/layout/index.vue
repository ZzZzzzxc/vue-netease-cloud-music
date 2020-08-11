<template>
  <div class="app-wrap">
    <LayoutHeader />
    <LayoutBody />
    <LayoutFooter />
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutBody from "./body";
import LayoutFooter from "./footer";
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutFooter, LayoutBody },
};
</script>

<style lang="scss" scoped>
.app-wrap {
  height: 100vh;
}
</style>
