<template>
  <li class="z-submenu">
    <div class="z-submenu__title" @click="onSubMenuClick">
      {{ title }}
      <img
        :class="[`icon`, isOpen ? `reverse` : ``]"
        :src="require(`@/assets/icon/arrow-down.png`)"
      />
    </div>
    <transition name="fade">
      <ul v-show="isOpen">
        <slot></slot>
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  name: "ZSubMenu",
  provide: function() {
    return {
      subMenu: this,
    };
  },
  inject: ["rootMenu"],
  props: {
    title: {
      type: String,
      default: "title",
      required: true,
    },
    index: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    onSubMenuClick() {
      this.isOpen ? this.doSubMenuClose() : this.doSubMenuOpen();
    },
    doSubMenuOpen() {
      this.isOpen = true;
    },
    doSubMenuClose() {
      this.isOpen = false;
    },
  },
  mounted() {
    this.rootMenu.setSubMenus(this.index, this);
  },
};
</script>

<style lang="scss" scoped>
.z-submenu {
  height: auto;
  transition: all 0.3s;
  &__title {
    cursor: pointer;
    position: relative;
    height: $menu-title-height;
    padding: 0 12px;
    line-height: $menu-title-height;
    font-size: $font-size;
    color: $menu-title-color;
  }
  .icon {
    position: absolute;
    top: 50%;
    right: 24px;
    transition: 0.3s;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
  }
  .reverse {
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>
