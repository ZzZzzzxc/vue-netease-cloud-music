<template>
  <div class="tabs-wrapper">
    <tabs v-model="activeName">
      <tabs-pane label="视频" name="video">
        <video-list></video-list>
      </tabs-pane>
      <tabs-pane label="MV" name="mv">
        <mv-list></mv-list>
      </tabs-pane>
    </tabs>
  </div>
</template>

<script>
import { Tabs, TabsPane } from "@/base";
import MvList from "./mv/mv-list";
import videoList from "./video-list";
export default {
  name: "Video",
  components: {
    Tabs,
    TabsPane,
    MvList,
    videoList,
  },
  data() {
    return {
      activeName: "mv",
    };
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: 16px 56px;
}
</style>
