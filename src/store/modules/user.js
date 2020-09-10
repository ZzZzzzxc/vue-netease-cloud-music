export default {
  namespaced: true,
  state: {
    playing: false, // 播放状态
  },
  mutations: {
    setPlayState(state, playing) {
      state.playing = playing;
    },
  },
  actions: {
    clearPlaylist({ commit }) {
      commit("setPlaylist", []);
      commit("setCurrentSong", {});
    },
  },
};
