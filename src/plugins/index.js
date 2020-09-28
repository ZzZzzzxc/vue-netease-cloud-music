import "./axios";
import Vue from "vue";
import Notification from "@/base/z-notification/index";
const plugins = [{ key: "$notify", value: Notification }];
plugins.map(plugin => {
  Vue.use({
    install(Vue) {
      Object.defineProperty(Vue.prototype, plugin.key, {
        get() {
          return plugin.value;
        }
      });
    }
  });
});
