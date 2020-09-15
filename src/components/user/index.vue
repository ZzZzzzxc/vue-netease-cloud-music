<template>
  <div class="user-wrap" @click="openLoginDialog">
    <div class="img-wrap">
      <img class="icon" :src="require(`@/assets/icon/user.png`)" alt="" />
    </div>
    <div class="type">未登录</div>
    <div class="dialog-wrap">
      <Dialog
        v-model="dialogVisible"
        :width="`30%`"
        :handleClose="closeLoginDialog"
      >
        <template slot="header">
          <p class="title">登录</p>
        </template>
        <tabs v-model="activeName">
          <tabs-pane :label="`手机登录`" :name="`1`">
            <div class="form-wrap">
              <Zinput v-model="phone" placeholder="请输入手机号">
                <template slot="prepend">
                  <Select :defaultIdx="0" :list="selectListData"></Select>
                </template>
              </Zinput>
              <Zinput v-model="code" placeholder="请输入验证码"> </Zinput>
            </div>
          </tabs-pane>
          <tabs-pane :label="`邮箱登录`" :name="`2`">
            <div class="form-wrap">
              <Zinput v-model="phone" placeholder="请输入邮箱"> </Zinput>
              <Zinput v-model="code" type="password" placeholder="请输入密码">
              </Zinput>
            </div>
          </tabs-pane>
        </tabs>
        <template slot="footer">
          <div class="footer">
            <div class="login-btn">登录</div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { Dialog, Zinput, Select, Tabs, TabsPane } from "@/base";
export default {
  name: "User",
  components: { Dialog, Zinput, Select, Tabs, TabsPane },
  data() {
    return {
      dialogVisible: false,
      activeName: "1",
      phone: "",
      code: "",
      selectListData: [
        { label: "+86 中国大陆", value: "+86" },
        { label: "+852 香港", value: "+852" },
        { label: "+853 澳门", value: "+853" },
      ],
    };
  },
  watch: {},
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
  .dialog-wrap {
    color: $black;
    .title {
      font-size: 21px;
    }
    .form-wrap {
    }
    .login-btn {
      width: 100%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      background-color: $theme-color;
      color: $white;
      cursor: pointer;
    }
  }
}
</style>
