import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import music from "./modules/music";
import dom from "./modules/dom";

Vue.use(Vuex);
const isDev = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  // strict: isDev ? true : false,
  state: {},
  mutations: {},
  actions: {},
  modules: { music, dom },
  plugins: isDev ? [createLogger()] : []
});
