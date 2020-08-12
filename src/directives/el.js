export default {
  // 获取元素的 dom
  install: function install(Vue, options) {
    const directiveName = options.name || "el";
    Vue.directive(directiveName, {
      bind: (el, binding) => {
        binding.value(el);
      },
      inserted: () => {},
      update: () => {},
      componentUpdated: () => {},
      unbind: () => {}
    });
  }
};
