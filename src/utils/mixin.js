import { mapState, mapMutations, mapActions } from "vuex";

const musicMixin = {
  computed: {
    ...mapState({
      playing: state => state.music.playing, // 播放状态
      currentTime: state => state.music.currentTime, // 当前播放时间
      currentSong: state => state.music.currentSong, // 当前歌曲
      playlist: state => state.music.playlist, // 播放列表
      mode: state => state.music.mode, // 播放模式
      isMute: state => state.music.isMute, // 是否静音
      isPlaylistShow: state => state.music.isPlaylistShow, // 播放列表是否显示
      history: state => state.music.history, // 历史记录
      playlistLoading: state => state.music.loading // 歌单是否正在加载
    })
  },
  methods: {
    ...mapMutations([
      "setPlayState",
      "setCurrentTime",
      "setCurrentSong",
      "setPlaylistShow",
      "setMode",
      "setPlaylist",
      "setMute",
      "setPlaylistLoading"
    ]),
    ...mapActions(["clearPlaylist", "removeTargeSong"])
  }
};

const domMixin = {
  computed: {
    ...mapState({
      contentEl: state => state.dom.content,
      footerEl: state => state.dom.footer
    })
  },
  methods: {
    ...mapMutations(["setContent", "setFooter"])
  }
};

export { musicMixin, domMixin };
