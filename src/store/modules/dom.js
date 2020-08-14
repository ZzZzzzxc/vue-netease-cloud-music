export default {
  namespaced: true,
  state: {
    content: null, // content
    footer: null
  },
  mutations: {
    setContent(state, content) {
      state.content = content;
    },
    setFooter(state, footer) {
      state.footer = footer;
    }
  },
  actions: {},
  getters: {}
};
