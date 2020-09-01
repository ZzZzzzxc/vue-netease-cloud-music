<template>
  <Menu
    menuClass="menu-wrapper"
    :defaultActive="defaultActive"
    @active-change="handleRouteChange"
  >
    <menu-item-group title="推荐">
      <menu-item index="Recommendation">发现音乐</menu-item>
      <menu-item index="Fm" :disable="true">私人FM</menu-item>
      <menu-item index="Video">视频</menu-item>
    </menu-item-group>
    <sub-menu title="创建的歌单" index="/">
      <menu-item index="Discovery_" :disable="true">summer</menu-item>
      <menu-item index="Fm_" :disable="true">winter</menu-item>
      <menu-item index="Video_" :disable="true">paper</menu-item>
    </sub-menu>
    <menu-item-group title="通用组件">
      <menu-item index="Component">展示</menu-item>
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
