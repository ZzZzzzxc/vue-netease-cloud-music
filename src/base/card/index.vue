<template>
  <div class="z-card">
    <slot></slot>
    <div class="z-card-footer">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "Zcard",
  props: {
    title: {
      default: "",
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.z-card {
  position: relative;
  overflow: hidden;
  transition: 0.3s;
  &:hover {
    .z-card-footer {
      bottom: 0;
    }
  }
  .z-card-footer {
    background-color: $light-black;
    color: $white;
    position: absolute;
    height: 20px;
    bottom: -20px;
  }
}
</style>
