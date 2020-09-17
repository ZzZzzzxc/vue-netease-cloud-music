import store from "@/store";
import { initUserInfo } from "./business";

export function init() {
  const userId = localStorage.getItem("userId");
  if (userId) {
    store.commit("user/setUserId", userId);
    initUserInfo(userId);
  }
}
