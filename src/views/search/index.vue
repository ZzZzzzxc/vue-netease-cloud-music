<template>
  <div class="search-detail">
    <div class="title">
      <span v-html="brightenKeyword(title, `“${keywords}”`)"></span>
    </div>
    <tabs v-model="activeTabsName" :center="false">
      <tabs-pane
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.label"
      >
        <component
          :is="tab.component"
          :type="tab.type"
          :keywords="keywords"
          @count="getCount"
        ></component>
      </tabs-pane>
    </tabs>
  </div>
</template>

<script>
import Singer from "./detail/singer";
import Album from "./detail/album";
import Mv from "./detail/mv";
import Song from "./detail/song";
import Playlist from "./detail/playlist";
import User from "./detail/user";
const tabs = [
  { name: "song", label: "单曲", component: Song, type: 1 },
  { name: "album", label: "专辑", component: Album, type: 10 },
  { name: "singer", label: "歌手", component: Singer, type: 100 },
  { name: "playlist", label: "歌单", component: Playlist, type: 1000 },
  { name: "user", label: "用户", component: User, type: 1002 },
  { name: "mv", label: "MV", component: Mv, type: 1004 },
];
const info = {
  song: "首",
  album: "张",
  singer: "位",
  playlist: "个",
  user: "位",
  mv: "个",
};
import { brightenKeyword } from "@/utils";
import { Tabs, TabsPane } from "@/base";
export default {
  name: "Search",
  props: ["keywords"],
  components: { Tabs, TabsPane },
  data() {
    return {
      tabs,
      activeTabsName: "song",
      count: 0,
    };
  },
  watch: {
    activeTabsName() {
      this.count = 0;
    },
  },
  computed: {
    title() {
      const { activeTabsName, keywords, count } = this;
      let label;
      tabs.some(tab => {
        label = tab.label;
        return tab.name === activeTabsName;
      });
      return `搜索“${keywords}”，共找到 ${count || 0} ${
        info[activeTabsName]
      }${label}`;
    },
  },
  methods: {
    brightenKeyword,
    getCount(count) {
      this.count = count;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-detail {
  .title {
    font-size: 18px;
    margin: 24px 0;
  }
}
</style>
