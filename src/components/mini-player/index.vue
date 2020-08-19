<template>
  <div class="mini-player">
    <div class="song-wrap" v-if="hasCurrentSong">
      <div class="img-wrap" @click="toggleShowDetail">
        <Loading :width="20" :loading="loading">
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
      <div class="item" @click="pause" v-if="playing">
        <img :src="require(`@/assets/icon/pause.png`)" />
      </div>
      <div class="item" @click="play" v-if="!playing">
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
      id="audio"
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
    ></audio>
  </div>
</template>

<script>
const ERROR_MAP = {
  MEDIA_ERR_ABORTED: {
    key: 1,
    desc: "用户的请求中止了关联资源的获取."
  },
  MEDIA_ERR_NETWORK: {
    key: 2,
    desc: "尽管以前可用，但发生了某种网络错误，阻止了媒体的成功获取."
  },
  MEDIA_ERR_DECODE: {
    key: 3,
    desc: "	尽管先前已确定可用，但在尝试解码媒体资源时发生了错误，从而导致错误."
  },
  MEDIA_ERR_SRC_NOT_SUPPORTED: {
    key: 4,
    desc: "已发现关联的资源或媒体提供程序对象（例如MediaStream ）不合适."
  }
};
import { ProgressBar, Loading } from "@/base";
import { playModeConfig, defaultMode } from "@/config";
import { musicMixin, getImgUrl, formatTime, isNaN } from "@/utils";
export default {
  name: "MiniPlayer",
  mixins: [musicMixin],
  components: { ProgressBar, Loading },
  data() {
    return {
      playModeConfig,
      playProgress: 0,
      volumeProgress: 1,
      ready: false,
      error: false
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
    },
    isSingle() {
      return this.mode.key === playModeConfig.singel.key;
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
      } else {
        this.setCurrentTime(0);
      }
    },
    playProgress(progress) {
      const time = progress * this.currentSong.durationSecond;
      if (isNaN(time)) return;
      this.setCurrentTime(time);
    },
    volumeProgress(progress) {
      this.audio.volume = progress;
    },
    error(err) {
      if (err) {
        this.pause();
      }
    },
    currentTime(time) {
      this.playProgress = time / this.currentSong.durationSecond;
      this.audio.currentTime = time;
    }
  },
  methods: {
    getImgUrl,
    formatTime,
    toggleShowDetail() {
      this.setDetailShow(!this.isDetailShow);
    },
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
      // 单曲循环
      if (this.isSingle) {
        this.setCurrentTime(0);
        this.play();
        return;
      }
      this.next();
    },
    onWaiting() {
      // this.ready = false;
    },
    onPlay() {
      if (!this.playing) {
        this.setPlayState(true);
      }
    },
    onPause() {
      if (this.playing) {
        this.setPlayState(false);
      }
    },
    onError() {
      console.log("Error");
      this.error = true;
      const { error } = this.audio;
      if (error) {
        const { code, detail } = error;
        const errors = Object.values(ERROR_MAP);
        const idx = errors.findIndex(({ key }) => key === code);
        const msg = detail ? detail : errors[idx].desc;
        console.log(`CODE：${code}，信息：${msg}`);
      }
    },
    buffered() {
      // console.log("缓存进度");
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
      this.setCurrentTime(e.target.currentTime);
    },
    onVolumeChange() {
      // console.log("音量发生改变");
      console.log(this.audio.volume);
    },
    async play() {
      try {
        console.log("audio 播放");
        this.error = false;
        await this.audio.play();
      } catch (err) {
        this.error = true;
        console.error(err);
      }
    },
    pause() {
      console.log(`audio 暂停`);
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
      img {
        height: 100%;
        width: 100%;
        filter: blur(0.4px);
      }
      &:hover {
        img {
          filter: blur(1px);
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
