<template>
  <Menu
    menuClass="menu-wrapper"
    :defaultActive="defaultActive"
    @active-change="handleRouteChange"
  >
    <menu-item-group title="推荐">
      <menu-item index="Recommendation">发现音乐</menu-item>
      <menu-item index="Fm">私人FM</menu-item>
      <menu-item index="Video">视频</menu-item>
    </menu-item-group>
    <sub-menu title="创建的歌单" index="/">
      <menu-item index="Discovery_">summer</menu-item>
      <menu-item index="Fm_">winter</menu-item>
      <menu-item index="Video_">paper</menu-item>
    </sub-menu>
    <menu-item-group title="通用组件">
      <menu-item index="Component">test</menu-item>
    </menu-item-group>
  </Menu>
</template>

<script>
import { Menu, SubMenu, MenuItem, MenuItemGroup } from "@/base";
export default {
  name: "MenuLayout",
  components: { Menu, MenuItem, SubMenu, MenuItemGroup },
  data() {
    return {
      defaultActive: this.$route.name,
    };
  },
  methods: {
    handleOpen(keyPath) {
      console.log(keyPath);
    },
    handleClose(keyPath) {
      console.log(keyPath);
    },
    handleItemSelect(index) {
      console.log(index);
    },
    handleRouteChange(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  height: 100%;
}
</style>
