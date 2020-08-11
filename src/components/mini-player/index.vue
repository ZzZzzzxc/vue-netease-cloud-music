<template>
  <div class="mini-player">
    <div class="song-wrap"></div>
    <div class="control-wrap">
      <img class="item" :src="require(`@/assets/icon/prev.png`)" />
      <img class="item" v-if="play" :src="require(`@/assets/icon/pause.png`)" />
      <img class="item" v-else :src="require(`@/assets/icon/play.png`)" />
      <img class="item" :src="require(`@/assets/icon/next.png`)" />
    </div>
    <div class="progress-bar-wrap">
      <ProgressBar v-model="percentage" />
    </div>
    <div class="tools-wrap">
      <div class="volume">
        <img
          class="item"
          v-if="mute"
          :src="require(`@/assets/icon/mute.png`)"
        />
        <img class="item" v-else :src="require(`@/assets/icon/volume.png`)" />
        <div class="bar">
          <ProgressBar :color="`black`" v-model="volume" />
        </div>
      </div>
      <div class="mode">
        <img
          class="item"
          v-if="mode === playModeConfig.random"
          :src="require(`@/assets/icon/随机.png`)"
        />
        <img
          class="item"
          v-if="mode === playModeConfig.circulation"
          :src="require(`@/assets/icon/列表循环.png`)"
        />
        <img
          class="item"
          v-if="mode === playModeConfig.order"
          :src="require(`@/assets/icon/列表顺序.png`)"
        />
        <img
          class="item"
          v-if="mode === playModeConfig.singel"
          :src="require(`@/assets/icon/单曲循环.png`)"
        />
      </div>
      <div class="playlist">
        <img class="item" :src="require(`@/assets/icon/playlist.png`)" />
      </div>
    </div>
  </div>
</template>

<script>
import { ProgressBar } from "@/base";
import { playModeConfig } from "@/config";
export default {
  name: "",
  components: { ProgressBar },
  data() {
    return {
      playModeConfig,
      percentage: 0.5,
      volume: 0.2,
      play: true,
      mute: true,
      mode: playModeConfig.random,
    };
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {
    percentage(percentage) {
      console.log(percentage);
    },
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 6px 24px;
  .song-wrap {
  }
  .control-wrap {
    display: flex;
    justify-content: space-between;
    margin: 0 24px;
    .item {
      height: 36px;
      width: 36px;
      margin: 0 6px;
    }
  }
  .progress-bar-wrap {
    margin: 0 48px;
    width: 700px;
  }
  .tools-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
    .volume {
      display: flex;
      align-items: center;
      margin: 0 12px;
      .bar {
        width: 100px;
      }
      .item {
        height: 18px;
      }
    }
    .mode {
      margin: 0 12px;
      .item {
        height: 24px;
      }
    }
    .playlist {
      margin: 0 12px;
      .item {
        height: 24px;
      }
    }
  }
}
</style>
