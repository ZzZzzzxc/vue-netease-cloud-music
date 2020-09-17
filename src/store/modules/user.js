export default {
  namespaced: true,
  state: {
    userId: "", // id
    nickname: "", // 名字
    signature: "", // 个性签名
    playlist: "", // 歌单
    avatarUrl: "", // 头像
    backgroundUrl: "", // 背景图
    level: "", // 等级
    follows: "", // 关注数
    followeds: "", // 粉丝数
    eventCount: "" // 动态数
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setNickname(state, nickname) {
      state.nickname = nickname;
    },
    setSignature(state, signature) {
      state.signature = signature;
    },
    setAvatarUrl(state, avatarUrl) {
      state.avatarUrl = avatarUrl;
    },
    setBackgroundUrl(state, backgroundUrl) {
      state.backgroundUrl = backgroundUrl;
    },
    setUserPlaylist(state, playlist) {
      state.playlist = playlist;
    },
    setLevel(state, level) {
      state.level = level;
    },
    setFollows(state, follows) {
      state.follows = follows;
    },
    setFolloweds(state, followeds) {
      state.followeds = followeds;
    },
    setEventCount(state, eventCount) {
      state.eventCount = eventCount;
    }
  },
  actions: {},
  getters: {
    isLogin(state) {
      return !!state.userId;
    }
  }
};
