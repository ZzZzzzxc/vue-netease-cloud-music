<template>
  <div>
    <Menu menuClass="menu-wrapper" defaultActive="/discovery">
      <MenuItemGroup title="推荐">
        <MenuItem index="/discovery">发现音乐</MenuItem>
        <MenuItem index="/fm">私人FM</MenuItem>
        <MenuItem index="/show">直播</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup title="我的音乐">
        <MenuItem index="/local-music">本地音乐</MenuItem>
        <MenuItem index="/mv">MV</MenuItem>
      </MenuItemGroup>
      <SubMenu title="创建的歌单" index="/">
        <MenuItem index="/summer">summer</MenuItem>
        <MenuItem index="/winter">winter</MenuItem>
        <MenuItem index="/paper">paper</MenuItem>
      </SubMenu>
    </Menu>
  </div>
</template>

<script>
import { Menu, SubMenu, MenuItem, MenuItemGroup } from "@/base/index";
export default {
  name: "",
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
