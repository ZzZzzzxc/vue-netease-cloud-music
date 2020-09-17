<template>
  <popover :closeDelay="200" trigger="hover" :popperStyle="{ padding: 0 }">
    <div class="user">
      <div class="img-wrap">
        <img v-lazy="getImgUrl(userAvatarUrl, 140, 140)" />
      </div>
      <div class="name">{{ userNickname }}</div>
    </div>
    <template slot="content">
      <div class="detail-wrap">
        <div class="header">
          <div class="main">
            <div class="avatar-wrap">
              <img v-lazy="getImgUrl(userAvatarUrl, 140, 140)" />
            </div>
            <div class="user-name">{{ userNickname }}</div>
          </div>
          <div class="sign">签到</div>
        </div>
        <div class="trend">
          <div class="item">
            <h1>{{ userEventCount }}</h1>
            <div>动态</div>
          </div>
          <div class="item">
            <h1>{{ userFollows }}</h1>
            <div>关注</div>
          </div>
          <div class="item">
            <h1>{{ userFolloweds }}</h1>
            <div>粉丝</div>
          </div>
        </div>
        <ul class="selection">
          <ul class="list" v-for="(ul, idx) in ulData" :key="idx">
            <li class="item" v-for="li in ul" :key="li">{{ li }}</li>
          </ul>
        </ul>
        <div class="logout" @click="logout">退出登录</div>
      </div>
    </template>
  </popover>
</template>

<script>
import { userMixin, getImgUrl, userLogout } from "@/utils";
import { Popover } from "@/base";
export default {
  name: "User",
  mixins: [userMixin],
  components: { Popover },
  data() {
    return {
      ulData: [
        ["会员中心", "等级", "商城"],
        ["个人信息设置", "社交账号绑定"],
      ],
    };
  },
  mounted() {},
  methods: {
    getImgUrl,
    async logout() {
      await userLogout();
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.user {
  transition: 0.3s;
  height: $header-height;
  display: flex;
  padding: 0 8px;
  align-items: center;
  .img-wrap {
    margin-right: 8px;
    display: flex;
    align-items: center;
    img {
      @include circle(32px);
    }
  }
  .name {
    font-size: $font-size-sm;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
}
.detail-wrap {
  cursor: pointer;
  padding-top: 21px;
  font-size: $font-size-sm;
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 21px;
    .main {
      margin-right: 48px;
      display: flex;
      align-items: center;
      .avatar-wrap {
        display: flex;
        align-items: center;
        img {
          @include circle(36px);
        }
      }
      .user-name {
        margin-left: 8px;
      }
    }
    .sign {
      border: solid $grey 1px;
      font-size: $font-size-sm;
      padding: 6px 16px;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 6px;
      &:hover {
        background-color: $grey-light;
      }
    }
  }
  .trend {
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 18px 0;
    border-bottom: solid 1px $grey;
    .item {
      width: 33%;
      &:nth-child(2) {
        border-left: solid 1px $grey;
        border-right: solid 1px $grey;
      }
      div {
        color: $grey-dark;
        margin-top: 4px;
      }
    }
  }
  .selection {
    .list {
      border-bottom: solid 1px $grey;
      .item {
        padding: 0 21px;
        height: 36px;
        line-height: 36px;
        transition: 0.3s;
        cursor: not-allowed;
        &:hover {
          background-color: $grey;
        }
      }
    }
  }
  .logout {
    padding: 0 21px;
    height: 44px;
    line-height: 48px;
    transition: 0.3s;
    &:hover {
      background-color: $grey;
    }
  }
}
</style>
