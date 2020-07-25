<template>
  <div>
    <Tabs v-model="activeName">
      <TabsPanel label="个性推荐" name="1">个性推荐</TabsPanel>
      <TabsPanel label="歌单" name="2">歌单</TabsPanel>
      <TabsPanel label="排行榜" name="3">排行榜</TabsPanel>
      <TabsPanel label="歌手" name="4">歌手</TabsPanel>
      <TabsPanel label="最新音乐" name="5">最新音乐</TabsPanel>
    </Tabs>
  </div>
</template>

<script>
import { Tabs, TabsPanel } from "@/base/index";
export default {
  name: "Discovery",
  data() {
    return {
      activeName: "1"
    };
  },
  components: {
    Tabs,
    TabsPanel
  }
};
</script>

<style></style>
