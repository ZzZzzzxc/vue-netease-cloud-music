<template>
  <div class="user-wrap" @click="openLoginDialog">
    <div class="img-wrap">
      <img class="icon" :src="require(`@/assets/icon/user.png`)" alt="" />
    </div>
    <div class="type">未登录</div>
    <Dialog
      v-model="dialogVisible"
      :width="`30%`"
      :handleClose="closeLoginDialog"
    >
      <template slot="header">登录</template>
      <h1>这是内容区域</h1>
      <template slot="footer">这是Footer</template>
    </Dialog>
  </div>
</template>

<script>
import { Dialog } from "@/base";
export default {
  name: "User",
  components: { Dialog },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    openLoginDialog() {
      this.dialogVisible = true;
    },
    closeLoginDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-wrap {
  transition: 0.3s;
  height: $header-height;
  display: flex;
  padding: 0 8px;
  .img-wrap {
    margin-right: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
      width: 24px;
      height: 24px;
    }
  }
  &:hover {
    background-color: $theme-color-dark;
  }
}
</style>
