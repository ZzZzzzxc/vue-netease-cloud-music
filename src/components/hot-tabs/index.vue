<template>
  <ul class="hot-tabs">
    <li v-for="tab in tabs" :key="tab">
        
    </li>
  </ul>
</template>

<script>
export default {
  name: "HotTabs",
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
