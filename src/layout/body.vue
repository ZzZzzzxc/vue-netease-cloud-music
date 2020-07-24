<template>
  <div>
    <LayoutMenu />
    <div>
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

<style></style>
