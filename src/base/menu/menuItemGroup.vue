<template>
  <li class="z-menu-item-group">
    <div class="z-menu-item-group__title">{{ title }}</div>
    <ul>
      <slot />
    </ul>
  </li>
</template>

<script>
export default {
  name: "ZMenuItemGroup",
  provide: function() {
    return {
      menuItemGroup: this
    };
  },
  inject: ["rootMenu"],
  props: {
    title: {
      type: String,
      default: "group-title",
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.z-menu-item-group {
  &__title {
    height: $menu-title-height;
    padding: 0 12px;
    line-height: $menu-title-height;
    font-size: $font-size-sm;
    color: $menu-title-color;
  }
}
</style>
