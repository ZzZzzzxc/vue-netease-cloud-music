<template>
  <div class="z-tabs">
    <div class="z-tabs__header">
      <TabsNav />
    </div>
    <div class="z-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script>
import TabsNav from "./tabsNav";
export default {
  name: "ZTabs",
  provide: function() {
    return {
      root: this
    };
  },
  props: {
    activeName: {
      type: String
    },
    value: {}
  },
  data() {
    return {
      currentName: this.value || this.activeName,
      panes: []
    };
  },
  components: { TabsNav },
  methods: {
    setPanes(pane) {
      this.panes.push(pane);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.z-tabs {
  &__header {
  }
  &__content {
  }
}
</style>
