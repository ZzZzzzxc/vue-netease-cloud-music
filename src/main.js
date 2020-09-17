import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { init } from "@/utils";
init();

import LOADING_GIF from "./assets/loading.gif";
import VueLazyload from "vue-lazyload";
const EMPTY_IMG =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: EMPTY_IMG,
  loading: LOADING_GIF,
  attempt: 3,
  lazyComponent: true
});

import "@/style/index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
