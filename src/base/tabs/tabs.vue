<template>
  <div class="z-tabs">
    <div class="z-tabs__header">
      <TabsNav @click="handleClick" />
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
  model: {
    prop: "activeName",
    event: "activeChange"
  },
  props: {
    activeColor: String,
    activeName: {
      type: String
    },
    value: {},
    center: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentName: this.value || this.activeName,
      panes: []
    };
  },
  watch: {
    currentName(currentName) {
      this.$emit("activeChange", currentName);
    }
  },
  components: { TabsNav },
  methods: {
    setPanes(pane) {
      this.panes.push(pane);
    },
    handleClick(data) {
      this.$emit("click", data);
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
