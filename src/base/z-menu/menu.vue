<template>
  <ul class="z-menu" :class="menuClass">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "ZMenu",
  provide: function() {
    return {
      rootMenu: this
    };
  },
  props: {
    menuClass: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "vertical",
      validator: value => ["vertical", "horizontal "].indexOf(value) > -1
    },
    defaultActive: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: "click",
      validator: value => ["hover", "click"].indexOf(value) > -1
    }
  },
  data() {
    return {
      // 当前展开 Index
      activeIndex: this.defaultActive,
      openedMenus: [],
      // menuItem 实例
      menuItems: {},
      // submenu 实例
      submenus: {}
    };
  },
  watch: {
    activeIndex(idx) {
      this.$emit("active-change", idx);
    }
  },
  methods: {
    updateActiveIndex(val) {
      this.activeIndex = val;
    },
    // 初始化 menuItems ，在 menuItem 组件 mounted 阶段调用
    setItems(key, menuItem) {
      this.menuItems[key] = menuItem;
      menuItem.$on("activeIndexChange", this.updateActiveIndex);
    },
    // 初始化 submenus ，在 subMenu 组件 mounted 阶段调用
    setSubMenus(key, submenu) {
      this.submenus[key] = submenu;
    }
  }
};
</script>

<style lang="scss" scoped>
.z-menu {
  width: $menu-width;
  background-color: $menu-bg;
  overflow-y: auto;
}
</style>
