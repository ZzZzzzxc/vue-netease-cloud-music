<template>
  <div>
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
      <sub-menu title="创建的歌单" index="/" v-if="userPlaylist.length">
        <menu-item
          v-for="item in userPlaylist"
          :key="item.id"
          :index="item.id.toString()"
        >
          {{ item.name }}
        </menu-item>
      </sub-menu>
      <menu-item-group title="通用组件">
        <menu-item index="Component">展示</menu-item>
      </menu-item-group>
    </Menu>
  </div>
</template>

<script>
const ROUTER_LIST = ["Recommendation", "Fm", "Video", "Component"];
import { Menu, SubMenu, MenuItem, MenuItemGroup } from "@/base";
import { userMixin } from "@/utils";
export default {
  name: "MenuLayout",
  mixins: [userMixin],
  components: { Menu, MenuItem, SubMenu, MenuItemGroup },
  data() {
    return {
      defaultActive: this.$route.name,
    };
  },
  methods: {
    handleRouteChange(name) {
      if (ROUTER_LIST.includes(name)) {
        this.$router.push({ name });
      } else {
        this.$router.push({ name: "SongListDetail", params: { id: name } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  height: 100%;
}
</style>
