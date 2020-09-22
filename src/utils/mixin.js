import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

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
      playlistLoading: state => state.music.loading, // 歌单是否正在加载
      isDetailShow: state => state.music.isDetailShow, // 是否展示歌曲详情
    }),
    ...mapGetters("music", [
      `currentIndex`,
      `prevSong`,
      `nextSong`,
      `hasCurrentSong`,
    ]),
  },
  methods: {
    ...mapMutations("music", [
      "setPlayState",
      "setCurrentTime",
      "setCurrentSong",
      "setPlaylistShow",
      "setMode",
      "setPlaylist",
      "setMute",
      "setPlaylistLoading",
      "setDetailShow",
    ]),
    ...mapActions("music", [
      "clearPlaylist",
      "removeTargeSong",
      "addToPlaylist",
    ]),
  },
};

const userMixin = {
  computed: {
    ...mapState({
      userId: state => state.user.userId, // id
      userNickname: state => state.user.nickname, // 名字
      userSignature: state => state.user.signature, // 个性签名
      userPlaylist: state => state.user.playlist, // 歌单
      userAvatarUrl: state => state.user.avatarUrl, // 头像
      userBackgroundUrl: state => state.user.backgroundUrl, // 背景图
      userLevel: state => state.user.level, // 等级
      userFollows: state => state.user.follows, // 关注数
      userFolloweds: state => state.user.followeds, // 粉丝数
      userEventCount: state => state.user.eventCount, // 动态数
      userLogining: state => state.user.loading, // 登录中
    }),
    ...mapGetters("user", ["isLogin"]),
  },
  methods: {
    ...mapMutations("user", [
      "setPlayState",
      "setNickname",
      "setSignature",
      "setAvatarUrl",
      "setBackgroundUrl",
      "setUserPlaylist",
      "setLevel",
      "setFollows",
      "setFolloweds",
      "setEventCount",
      "setLoading",
    ]),
  },
};

export { musicMixin, userMixin };
