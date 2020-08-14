<template>
  <div class="mini-player">
    <div class="song-wrap" v-if="currentSong.id">
      <div class="img-wrap">
        <div class="mask"></div>
        <img :src="getImgUrl(currentSong.img, 64, 64)" />
      </div>
      <div class="info-wrap">
        <p :title="currentSong.name">{{ currentSong.name }}</p>
        <p :title="currentSong.artistsText">{{ currentSong.artistsText }}</p>
        <p>{{ formatTime(currentTime) }} / {{ currentSong.durationText }}</p>
      </div>
    </div>
    <div class="control-wrap">
      <div class="item" @click="prev">
        <img :src="require(`@/assets/icon/prev.png`)" />
      </div>
      <div class="item" v-if="playing" @click="pause">
        <img :src="require(`@/assets/icon/pause.png`)" />
      </div>
      <div class="item" v-else @click="play">
        <img :src="require(`@/assets/icon/play.png`)" />
      </div>
      <div class="item" @click="next">
        <img :src="require(`@/assets/icon/next.png`)" />
      </div>
    </div>
    <div class="progress-bar-wrap">
      <ProgressBar v-model="playProgress" :disable="disable" />
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
    <audio
      ref="audio"
      :src="currentSong.url"
      @canplay="canPlay"
      @ended="ended"
      @waiting="waiting"
      @timeupdate="timeUpdate"
    />
  </div>
</template>

<script>
import { ProgressBar } from "@/base";
import { playModeConfig } from "@/config";
import { musicMixin, getImgUrl, formatTime } from "@/utils";
export default {
  name: "MiniPlayer",
  mixins: [musicMixin],
  components: { ProgressBar },
  data() {
    return {
      playModeConfig,
      playProgress: 0,
      volume: 0.2,
      ready: false,
      disable: true
    };
  },
  computed: {
    audio() {
      return this.$refs.audio;
    }
  },
  watch: {
    currentSong(newSong) {
      if (newSong.id) {
        this.play();
        this.disable = false;
      } else {
        this.disable = true;
        this.setCurrentTime(0);
        this.pause();
      }
    },
    playProgress(progress) {
      const time = progress * this.currentSong.durationSecond;
      this.audio.currentTime = time;
      this.setCurrentTime(time);
    },
    currentTime(currentTime) {
      this.playProgress = currentTime / this.currentSong.durationSecond;
    }
  },
  methods: {
    getImgUrl,
    formatTime,
    toggleShow() {
      this.setPlaylistShow(!this.isPlaylistShow);
    },
    toggleMute() {
      this.setMute(!this.isMute);
    },
    handleMuteChange() {
      const modes = Object.values(playModeConfig);
      const index = modes.findIndex(val => val === this.mode) + 1;
      const mode = modes[index] ? modes[index] : playModeConfig.loop;
      this.setMode(mode);
    },
    canPlay() {
      this.ready = true;
      console.log("audio 准备完成");
    },
    ended() {
      this.next();
    },
    waiting(e) {
      console.log(e);
    },
    timeUpdate(e) {
      this.setCurrentTime(e.target.currentTime);
    },
    async play() {
      if (this.ready) {
        try {
          await this.audio.play();
          this.setPlayState(true);
          console.log("正常开始播放");
        } catch (err) {
          console.log("播放出错了");
          console.log(err);
          this.setPlayState(false);
        }
      }
    },
    async pause() {
      await this.audio.pause();
      this.setPlayState(false);
    },
    prev() {},
    next() {}
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
    display: flex;
    .img-wrap {
      position: relative;
      width: 48px;
      height: 48px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      margin-right: 12px;
      .mask {
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.1);
      }
      img {
        height: 100%;
        width: 100%;
        filter: blur(1px);
      }
      &:hover {
        .mask {
          z-index: 1;
        }
      }
    }
    .info-wrap {
      font-size: $font-size-sm;
      color: $grey-dark;
      width: 120px;
      p {
        @include text-ellipsis();
      }
    }
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
