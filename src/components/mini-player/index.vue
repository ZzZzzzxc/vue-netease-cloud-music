<template>
  <div class="mini-player">
    <div class="song-wrap" v-if="hasCurrentSong">
      <div class="img-wrap">
        <Loading :width="20" :loading="loading">
          <div class="mask"></div>
          <img :src="getImgUrl(currentSong.img, 64, 64)" />
        </Loading>
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
      <div class="item" @click="pause">
        <img
          :src="require(`@/assets/icon/${playing ? 'pause' : 'play'}.png`)"
        />
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
          <ProgressBar :color="`black`" v-model="volumeProgress" />
        </div>
      </div>
      <div class="mode" @click="handleModeChange" v-if="mode">
        <div class="item">
          <img :src="mode.icon" />
        </div>
      </div>
      <div class="playlist" @click="toggleShow">
        <img class="item" :src="require(`@/assets/icon/playlist.png`)" />
      </div>
    </div>
    <audio
      ref="audio"
      preload="auto"
      :src="currentSong.url"
      @play="onPlay"
      @canplay="canPlay"
      @ended="onEnded"
      @waiting="onWaiting"
      @progress="buffered"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
      @error="onError"
      @volumechange="onVolumeChange"
    />
  </div>
</template>

<script>
/**
 * 用户点击播放按钮触发
 *
 */
import { ProgressBar, Loading } from "@/base";
import { playModeConfig, defaultMode } from "@/config";
import { musicMixin, getImgUrl, formatTime } from "@/utils";
export default {
  name: "MiniPlayer",
  mixins: [musicMixin],
  components: { ProgressBar, Loading },
  data() {
    return {
      playModeConfig,
      playProgress: 0,
      volumeProgress: 1,
      ready: false
    };
  },
  computed: {
    audio() {
      return this.$refs.audio;
    },
    disable() {
      return !this.hasCurrentSong;
    },
    loading() {
      return this.hasCurrentSong && !this.ready;
    },
    isOrder() {
      return this.mode.key === playModeConfig.order.key;
    }
  },
  watch: {
    ready(ready) {
      if (ready && !this.playing) {
        this.play();
      }
    },
    currentSong(newSong) {
      if (newSong.id) {
        this.ready = false;
        this.setPlayState(false);
      }
    },
    playProgress(progress) {
      const time = progress * this.currentSong.durationSecond;
      this.audio.currentTime = time;
      this.setCurrentTime(time);
    },
    volumeProgress(progress) {
      this.audio.volume = progress;
    }
  },
  methods: {
    getImgUrl,
    formatTime,
    toggleShow() {
      this.setPlaylistShow(!this.isPlaylistShow);
    },
    // 静音切换
    toggleMute() {
      this.setMute(!this.isMute);
      this.audio.muted = !this.isMute;
    },
    // 播放模式切换
    handleModeChange() {
      const modes = Object.values(playModeConfig);
      const index = modes.findIndex(val => val.key === this.mode.key) + 1;
      const mode = modes[index] ? modes[index] : defaultMode;
      this.setMode(mode);
    },
    canPlay() {
      console.log("audio 准备完成");
      this.ready = true;
    },
    onEnded() {
      // 列表顺序模式下，播放完最后一首歌曲就停止播放
      if (this.isOrder && this.currentIndex === this.playlist.length - 1)
        return;
      this.next();
    },
    onWaiting() {
      // this.ready = false;
    },
    onPlay() {
      console.log("播放事件触发");
      if (!this.playing) {
        this.setPlayState(true);
      }
    },
    onPause() {
      console.log("暂停事件触发");
      if (this.playing) {
        this.setPlayState(false);
      }
    },
    onError() {
      console.log("Error");
      const { error } = this.audio;
      if (error) {
        console.log(error);
      }
    },
    buffered() {
      console.log("缓存进度");
      const { audio } = this;
      const duration = { audio };
      console.log(audio.buffered);
      if (duration > 0) {
        for (var i = 0; i < audio.buffered.length; i++) {
          if (
            audio.buffered.start(audio.buffered.length - 1 - i) <
            audio.currentTime
          ) {
            console.log(
              audio.buffered.end(audio.buffered.length - 1 - i) / duration
            );
            break;
          }
        }
      }
    },
    onTimeUpdate(e) {
      this.playProgress =
        e.target.currentTime / this.currentSong.durationSecond;
    },
    onVolumeChange() {
      console.log("音量发生改变");
      console.log(this.audio.volume);
    },
    async play() {
      if (this.ready) {
        try {
          await this.audio.play();
        } catch (err) {
          console.error(err);
        }
      }
    },
    pause() {
      this.audio.pause();
    },
    prev() {
      if (this.prevSong) this.setCurrentSong(this.prevSong);
    },
    next() {
      if (this.nextSong) this.setCurrentSong(this.nextSong);
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
