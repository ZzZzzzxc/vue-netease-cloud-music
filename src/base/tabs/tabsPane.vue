<template>
  <div v-show="active">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ZTabsPane",
  inject: ["root"],
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    active() {
      return this.root.currentName === this.name;
    }
  },
  mounted() {
    this.root.setPanes(this);
  }
};
</script>

<style lang="scss" scoped></style>
