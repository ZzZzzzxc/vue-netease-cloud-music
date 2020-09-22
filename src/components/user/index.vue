<template>
  <loading :loading="userLogining" :width="20">
    <div class="user-wrap">
      <user v-show="isLogin"></user>
      <login v-show="!isLogin"></login>
    </div>
  </loading>
</template>

<script>
import login from "./login";
import user from "./user";
import { userMixin } from "@/utils";
import { Loading } from "@/base";
export default {
  name: "UserWrap",
  mixins: [userMixin],
  components: { login, user, Loading },
};
</script>

<style lang="scss" scoped>
.user-wrap {
  cursor: pointer;
}
</style>
