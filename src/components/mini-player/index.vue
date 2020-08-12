<template>
  <div class="mini-player">
    <div class="song-wrap"></div>
    <div class="control-wrap">
      <div class="item">
        <img :src="require(`@/assets/icon/prev.png`)" />
      </div>
      <div class="item" v-if="playing" @click="togglePlay">
        <img :src="require(`@/assets/icon/pause.png`)" />
      </div>
      <div class="item" v-else @click="togglePlay">
        <img :src="require(`@/assets/icon/play.png`)" />
      </div>
      <div class="item">
        <img :src="require(`@/assets/icon/next.png`)" />
      </div>
    </div>
    <div class="progress-bar-wrap">
      <ProgressBar v-model="percentage" />
    </div>
    <div class="tools-wrap">
      <div class="volume">
        <div class="item" v-if="isMute" @click="toggleMute">
          <img :src="require(`@/assets/icon/mute.png`)" />
        </div>
        <div class="item" v-else @click="toggleMute">
          <img :src="require(`@/assets/icon/volume.png`)" />
        </div>
        <div class="bar">
          <ProgressBar :color="`black`" v-model="volume" />
        </div>
      </div>
      <div class="mode" @click="handleMuteChange">
        <div class="item" v-if="mode === playModeConfig.random">
          <img :src="require(`@/assets/icon/随机.png`)" />
        </div>
        <div class="item" v-if="mode === playModeConfig.loop">
          <img :src="require(`@/assets/icon/列表循环.png`)" />
        </div>
        <div class="item" v-if="mode === playModeConfig.order">
          <img :src="require(`@/assets/icon/列表顺序.png`)" />
        </div>
        <div class="item" v-if="mode === playModeConfig.singel">
          <img :src="require(`@/assets/icon/单曲循环.png`)" />
        </div>
      </div>
      <div class="playlist" @click="toggleShow">
        <img class="item" :src="require(`@/assets/icon/playlist.png`)" />
      </div>
    </div>
  </div>
</template>

<script>
import { ProgressBar } from "@/base";
import { playModeConfig } from "@/config";
import { musicMixin } from "@/utils";
export default {
  name: "MiniPlayer",
  mixins: [musicMixin],
  components: { ProgressBar },
  data() {
    return {
      playModeConfig,
      percentage: 0.5,
      volume: 0.2
    };
  },
  computed: {},
  watch: {
    percentage(percentage) {
      console.log(percentage);
    }
  },
  methods: {
    toggleShow() {
      this.setPlaylistShow(!this.isPlaylistShow);
    },
    togglePlay() {
      this.setPlayState(!this.playing);
    },
    toggleMute() {
      this.setMute(!this.isMute);
    },
    handleMuteChange() {
      const modes = Object.values(playModeConfig);
      const index = modes.findIndex(val => val === this.mode) + 1;
      const mode = modes[index] ? modes[index] : playModeConfig.loop;
      this.setMode(mode);
    }
  }
};
</script>

<style lang="scss" scoped>
.mini-player {
  user-select: none;
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
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        height: 36px;
        width: 36px;
        margin: 0 6px;
      }
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
        display: flex;
        align-items: center;
        img {
          cursor: pointer;
          height: 21px;
        }
      }
    }
    .mode {
      cursor: pointer;
      margin: 0 12px;
      .item {
        display: flex;
        align-items: center;
        img {
          height: 24px;
        }
      }
    }
    .playlist {
      margin: 0 12px;
      cursor: pointer;
      .item {
        height: 24px;
      }
    }
  }
}
</style>
