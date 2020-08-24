<template>
  <Menu menuClass="menu-wrapper" defaultActive="/discovery">
    <menu-item-group title="推荐">
      <menu-item index="/discovery">发现音乐</menu-item>
      <menu-item index="/fm">私人FM</menu-item>
      <menu-item index="/video">视频</menu-item>
    </menu-item-group>
    <menu-item-group title="我的音乐">
      <menu-item index="/local-music">本地音乐</menu-item>
      <menu-item index="/mv">MV</menu-item>
    </menu-item-group>
    <sub-menu title="创建的歌单" index="/">
      <menu-item index="/summer">summer</menu-item>
      <menu-item index="/winter">winter</menu-item>
      <menu-item index="/paper">paper</menu-item>
    </sub-menu>
    <menu-item-group title="通用组件">
      <menu-item index="/components">test</menu-item>
    </menu-item-group>
  </Menu>
</template>

<script>
import { Menu, SubMenu, MenuItem, MenuItemGroup } from "@/base";
export default {
  name: "MenuLayout",
  components: { Menu, MenuItem, SubMenu, MenuItemGroup },
  methods: {
    handleOpen(keyPath) {
      console.log(keyPath);
    },
    handleClose(keyPath) {
      console.log(keyPath);
    },
    handleItemSelect(index) {
      console.log(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  height: 100%;
}
</style>
