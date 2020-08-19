import { playModeConfig, defaultMode } from "@/config";
import { isDef } from "@/utils";

export default {
  namespaced: true,
  state: {
    playing: false, // 播放状态
    currentTime: 0, // 当前播放时间
    currentSong: {}, // 当前歌曲
    playlist: [], // 播放列表
    mode: defaultMode, // 播放模式
    isPlaylistShow: false, // 播放列表是否显示
    isMute: false, // 是否静音
    history: [], // 历史记录
    loading: false, // 歌单是否正在加载
    isDetailShow: false // 是否展示歌曲详情
  },
  mutations: {
    setPlayState(state, playing) {
      state.playing = playing;
    },
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },
    setCurrentSong(state, currentSong) {
      state.currentSong = currentSong;
    },
    setPlaylistShow(state, show) {
      state.isPlaylistShow = show;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setPlaylist(state, playlist) {
      state.playlist = playlist;
    },
    setMute(state, isMute) {
      state.isMute = isMute;
    },
    setPlaylistLoading(state, loading) {
      state.loading = loading;
    },
    setDetailShow(state, isDetailShow) {
      state.isDetailShow = isDetailShow;
    }
  },
  actions: {
    // 清除播放列表
    clearPlaylist({ commit }) {
      commit("setPlaylist", []);
      commit("setCurrentSong", {});
    },
    // 移除对应 idx 的歌曲
    removeTargeSong({ commit, state }, idx) {
      const playlist = state.playlist.slice();
      playlist.splice(idx, 1);
      commit("setPlaylist", playlist);
      commit("setCurrentSong", playlist[idx] ? playlist[idx] : {});
    },
    // 新增歌曲
    addToPlaylist({ commit, state }, song) {
      const playlist = state.playlist.slice();
      const { id } = song;
      if (!playlist.some(song => song.id === id)) {
        playlist.unshift(song);
        commit("setPlaylist", playlist);
        commit("setCurrentSong", song);
      }
    }
  },
  getters: {
    // 当前是否有歌曲在播放
    hasCurrentSong(state) {
      return isDef(state.currentSong.id);
    },
    currentIndex(state) {
      const { currentSong, playlist } = state;
      return playlist.findIndex(({ id }) => id === currentSong.id);
    },
    prevSong(state, getters) {
      const { playlist, mode } = state;
      const prevIndexMap = {
        [playModeConfig.order.key]: getSequencePrevIndex(), // 列表顺序
        [playModeConfig.loop.key]: getSequencePrevIndex(), // 列表循环
        [playModeConfig.random.key]: getRandomPrevIndex(), // 随机播放
        [playModeConfig.singel.key]: getSingelPrevIndex() // 单曲循环
      };

      return playlist[prevIndexMap[mode.key]];

      // 列表顺序
      function getSequencePrevIndex() {
        let prevIndex = getters.currentIndex - 1;
        if (prevIndex < 0) {
          prevIndex = playlist.length - 1;
        }
        return prevIndex;
      }

      // 随机播放
      function getRandomPrevIndex() {
        return getRandomIndex(playlist, getters.currentIndex);
      }

      // 单曲
      function getSingelPrevIndex() {
        return getters.currentIndex;
      }
    },
    nextSong(state, getters) {
      const { playlist, mode } = state;
      const nextIndexMap = {
        [playModeConfig.order.key]: getLoopNextIndex(), // 列表顺序
        [playModeConfig.loop.key]: getLoopNextIndex(), // 列表循环
        [playModeConfig.random.key]: getRandomNextIndex(), // 随机播放
        [playModeConfig.singel.key]: getSingelNextIndex() // 单曲循环
      };

      return playlist[nextIndexMap[mode.key]];

      // 列表循环 列表顺序
      function getLoopNextIndex() {
        let nextIndex = getters.currentIndex + 1;
        if (nextIndex > playlist.length - 1) {
          nextIndex = 0;
        }
        return nextIndex;
      }

      // 随机播放
      function getRandomNextIndex() {
        return getRandomIndex(playlist, getters.currentIndex);
      }

      // 单曲
      function getSingelNextIndex() {
        return getters.currentIndex;
      }
    }
  }
};

function getRandomIndex(playlist, currentIndex) {
  // 防止无限循环
  if (playlist.length === 1) {
    return currentIndex;
  }
  let index = Math.round(Math.random() * (playlist.length - 1));
  if (index === currentIndex) {
    index = getRandomIndex(playlist, currentIndex);
  }
  return index;
}
