<template>
  <transition name="playlist">
    <div class="playlist-wrap" v-show="isPlaylistShow">
      <Tabs v-model="activeName">
        <TabsPane :name="`1`" :label="`播放列表`"></TabsPane>
        <TabsPane :name="`2`" :label="`历史记录`"></TabsPane>
      </Tabs>
    </div>
  </transition>
</template>

<script>
import { on, off, musicMixin, domMixin } from "@/utils";
import { Tabs, TabsPane } from "@/base";
export default {
  name: "Playlist",
  mixins: [musicMixin, domMixin],
  components: { Tabs, TabsPane },
  data() {
    return {
      activeName: "1"
    };
  },
  computed: {},
  watch: {},
  methods: {
    close(e) {
      const { target } = e;
      if (this.footerEl.contains(target)) return; // 点击 footer
      if (this.$el.contains(target)) return; // 点击自身
      this.setPlaylistShow(false);
    }
  },
  mounted() {
    on(document, "click", this.close);
  },
  beforeDestroy() {
    off(document, "click", this.close);
  }
};
</script>

<style lang="scss" scoped>
.playlist-wrap {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: $playlist-width;
  background-color: $white;
  z-index: $playlist-index;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
