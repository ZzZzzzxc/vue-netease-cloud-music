<template>
  <div class="login-wrap" @click="openLoginDialog">
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
              @click.stop="register"
            >
              注册
            </div>
            <div class="login-btn btn" v-else @click.stop="login">登录</div>
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
import { getCountriesCodeList } from "@/api";
import { userLogin, userMixin } from "@/utils";

export default {
  name: "Login",
  mixins: [userMixin],
  components: { Dialog, Zinput, Select, Tabs, TabsPane },
  data() {
    return {
      REGISTER_NAME,
      LOGIN_NAME,
      dialogVisible: false,
      activeName: LOGIN_NAME,
      phone: "",
      code: "",
      account: "",
      password: "",
      countriesCodeList: [],
      loading: false
    };
  },
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
      this.setLoading(true);
      await userLogin(this.account, this.password).finally(() => {
        this.closeLoginDialog();
      });
      this.setLoading(false);
    },
    async register() {}
  },
  created() {
    this.initCountriesCodeList();
  }
};
</script>

<style lang="scss" scoped>
.login-wrap {
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
    .icon {
      width: 24px;
      height: 24px;
    }
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
      @include box-shadow;
    }
    .register-btn {
      background-color: $white;
      color: $black;
      border: 1px $grey solid;
      &:hover {
        @include box-shadow;
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
