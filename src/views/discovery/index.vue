<template>
  <div class="tabs-wrapper">
    <Tabs v-model="activeName">
      <TabsPane label="个性推荐" name="1"><Recommend /></TabsPane>
      <TabsPane label="歌单" name="2"><SongList /></TabsPane>
      <TabsPane label="排行榜" name="3"><Rank /></TabsPane>
      <TabsPane label="歌手" name="4"><Singer /></TabsPane>
      <TabsPane label="最新音乐" name="5"><Music /></TabsPane>
    </Tabs>
  </div>
</template>

<script>
import { Tabs, TabsPane } from "@/base/index";
import Rank from "./rank";
import Recommend from "./recommendation";
import SongList from "./song-list";
import Singer from "./singer";
import Music from "./new-music";
export default {
  name: "Discovery",
  data() {
    return {
      activeName: "1"
    };
  },
  components: {
    Tabs,
    TabsPane,
    Music,
    Singer,
    SongList,
    Recommend,
    Rank
  }
};
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: 16px 56px;
}
</style>
