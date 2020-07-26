<template>
  <div class="tabs-wrapper">
    <Tabs v-model="activeName">
      <TabsPane label="个性推荐" name="1"><recommend /></TabsPane>
      <TabsPane label="歌单" name="2"><sheet /></TabsPane>
      <TabsPane label="排行榜" name="3"><rank /></TabsPane>
      <TabsPane label="歌手" name="4"><singer /></TabsPane>
      <TabsPane label="最新音乐" name="5"><music /></TabsPane>
    </Tabs>
  </div>
</template>

<script>
import { Tabs, TabsPane } from "@/base/index";
import rank from "./rank.vue";
import recommend from "./recommend.vue";
import sheet from "./sheet.vue";
import singer from "./singer.vue";
import music from "./music";
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
    music,
    singer,
    sheet,
    recommend,
    rank
  }
};
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: 16px 56px;
}
</style>
