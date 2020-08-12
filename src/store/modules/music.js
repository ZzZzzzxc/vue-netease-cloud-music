import { playModeConfig } from "@/config";

export default {
  state: {
    playing: false, // 播放状态
    currentTime: 0, // 当前播放时间
    currentSong: {}, // 当前歌曲
    playlist: [], // 播放列表
    mode: playModeConfig.loop, // 播放模式
    isPlaylistShow: false, // 播放列表是否显示
    isMute: false, // 是否静音
    history: [] // 历史记录
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
    }
  },
  actions: {
    setPlayState(context) {
      context.commit("setPlayState");
    },
    setCurrentTime(context) {
      context.commit("setCurrentTime");
    },
    setCurrentSong(context) {
      context.commit("setCurrentSong");
    },
    setPlaylistShow(context) {
      context.commit("setPlaylistShow");
    },
    setMode(context) {
      context.commit("setMode");
    },
    setPlaylist(context) {
      context.commit("setPlaylist");
    },
    setMute(context) {
      context.commit("setMute");
    }
  },
  getters: {}
};
