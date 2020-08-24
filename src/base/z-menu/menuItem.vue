<template>
  <li
    class="z-menu-item"
    :class="[rootMenu.activeIndex === index ? `z-menu-item__active` : ``]"
    @click.stop="onClick"
  >
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "ZMenuItem",
  inject: ["rootMenu"],
  props: {
    index: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.rootMenu.setItems(this.index, this);
  },
  methods: {
    onClick() {
      this.handleActiveIndexChange();
    },
    // 通知 menu activeIndex 改变
    handleActiveIndexChange() {
      this.$emit("activeIndexChange", this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.z-menu-item {
  padding: 0 40px;
  height: $menu-item-height;
  line-height: $menu-item-height;
  color: $black;
  font-size: $font-size;
  cursor: pointer;
  &__active {
    background-color: $menu-item-active;
    position: relative;
    &::before {
      content: "";
      height: $menu-item-height;
      width: 3px;
      position: absolute;
      left: 0;
      background-color: $theme-color;
    }
  }
}
</style>
