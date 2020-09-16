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
          <p class="title">{{ activeName }}</p>
        </template>
        <tabs v-model="activeName">
          <tabs-pane :label="REGISTER_NAME" :name="REGISTER_NAME">
            <div class="form-wrap">
              <Zinput v-model="phone" placeholder="请输入手机号">
                <template slot="prepend">
                  <Select
                    :defaultIdx="0"
                    :list="countriesCodeList"
                    :labelName="`code`"
                    :valueName="`en`"
                  >
                    <template v-slot:item="item">
                      <div class="select-item-wrap">
                        <div class="item">
                          {{ item.scopeSlot.zh }}
                        </div>
                        <div class="item">
                          {{ item.scopeSlot.code }}
                        </div>
                      </div>
                    </template>
                  </Select>
                </template>
              </Zinput>
              <Zinput v-model="code" placeholder="请输入验证码"> </Zinput>
            </div>
          </tabs-pane>
          <tabs-pane :label="LOGIN_NAME" :name="LOGIN_NAME">
            <div class="form-wrap">
              <Zinput v-model="account" placeholder="请输入邮箱/手机号">
              </Zinput>
              <Zinput
                v-model="password"
                type="password"
                placeholder="请输入密码"
              >
              </Zinput>
            </div>
          </tabs-pane>
        </tabs>
        <template slot="footer">
          <div class="footer">
            <div
              class="register-btn btn"
              v-if="activeName === REGISTER_NAME"
              @click="register"
            >
              注册
            </div>
            <div class="login-btn btn" v-else @click="login">登录</div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
const LOGIN_NAME = "账号登录";
const REGISTER_NAME = "用户注册";
import { Dialog, Zinput, Select, Tabs, TabsPane } from "@/base";
import { loginByEmail, getCountriesCodeList, loginByPhone,getLoginStatus } from "@/api";
export default {
  name: "User",
  components: { Dialog, Zinput, Select, Tabs, TabsPane },
  data() {
    return {
      REGISTER_NAME,
      LOGIN_NAME,
      dialogVisible: false,
      activeName: LOGIN_NAME,
      phone: "",
      code: "",
      account: "13690896312",
      password: "Zxc199821",
      countriesCodeList: [],
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
    async initCountriesCodeList() {
      const { data } = await getCountriesCodeList();
      const codeList = [];
      data.map(item => codeList.push(...item.countryList));
      this.countriesCodeList = codeList;
    },
    async login() {
      const { account, password } = this;
      const pattern = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      if (pattern.test(account)) {
        // 邮箱登录
        await loginByEmail({
          email: account,
          password,
        });
      } else {
        // 手机号登录
        const { cookie } = await loginByPhone({
          phone: account,
          password,
        });
        document.cookie = cookie;
        getLoginStatus()
        // window.localStorage
      }
    },
    async register() {},
  },
  created() {
    this.initCountriesCodeList();
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
    .btn {
      width: 100%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      cursor: pointer;
      border-radius: 6px;
      transition: 0.3s;
    }
    .login-btn {
      background-color: $theme-color;
      color: $white;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .register-btn {
      background-color: $white;
      color: $black;
      border: 1px $grey solid;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.select-item-wrap {
  display: flex;
  justify-content: space-between;
  .item {
    @include text-ellipsis();
    font-size: $font-size-sm;
  }
}
</style>
