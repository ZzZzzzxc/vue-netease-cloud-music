<template>
  <div class="user-wrap">
    <user v-show="isLogin"></user>
    <login v-show="!isLogin"></login>
  </div>
</template>

<script>
import login from "./login";
import user from "./user";
import { userMixin } from "@/utils";
export default {
  name: "UserWrap",
  mixins: [userMixin],
  components: { login, user },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.user-wrap {
  cursor: pointer;
}
</style>
