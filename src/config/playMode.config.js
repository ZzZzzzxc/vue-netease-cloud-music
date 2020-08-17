export const playModeConfig = {
  loop: {
    icon: require("@/assets/icon/列表循环.png"),
    key: "loop"
  }, // 列表循环
  order: {
    icon: require("@/assets/icon/列表顺序.png"),
    key: "order"
  }, // 列表顺序
  random: { icon: require("@/assets/icon/随机.png"), key: "random" }, // 随机播放
  singel: { icon: require("@/assets/icon/单曲循环.png"), key: "singel" } // 单曲循环
};

export const defaultMode = playModeConfig.loop;
