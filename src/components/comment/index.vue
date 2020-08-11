<template>
  <div class="comment-wrap">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(avatar, 45)" />
    </div>
    <div class="content-wrap" v-if="content">
      <p class="content">
        <span class="name">{{ name }}：</span>
        <span class="detail">{{ content }}</span>
      </p>
      <p class="reply" v-if="replyName && replyContent">
        <span class="name">@{{ replyName }}：</span>
        <span class="detail" v-if="replyContent">{{ replyContent }}</span>
      </p>
      <div v-if="replyName && !replyContent" class="delete">该评论已删除</div>
      <div class="bottom">
        <div class="date">{{ date }}</div>
        <div class="tools">
          <div class="item">点赞({{ count }})</div>
          <div class="item">分享</div>
          <div class="item">回复</div>
        </div>
      </div>
    </div>
    <div v-else class="delete">该评论已删除</div>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "Comment",
  props: [
    "avatar",
    `name`,
    `date`,
    `content`,
    `count`,
    `replyName`,
    `replyContent`
  ],
  data() {
    return {};
  },
  methods: { getImgUrl },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.comment-wrap {
  display: flex;
  width: 100%;
  font-size: $font-size;
  .img-wrap {
    width: 45px;
    height: 45px;
    margin-right: 18px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .content-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .delete {
      margin-bottom: 10px;
    }
    .content {
      margin-bottom: 10px;
      .name {
        color: $blue;
      }
      .detail {
      }
    }
    .reply {
      margin-bottom: 10px;
      padding: 6px 10px;
      background-color: $grey-light;
      font-size: $font-size-sm;
      .name {
        color: $blue;
      }
      .detail {
        color: $grey-dark;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      font-size: $font-size-sm;
      color: $grey-dark;
      .date {
      }
      .tools {
        display: flex;
        .item {
          padding: 0 8px;
          &:nth-child(2) {
            border-left: solid 1px $grey-dark;
            border-right: solid 1px $grey-dark;
          }
          &:nth-child(3) {
            padding-right: 0;
          }
        }
      }
    }
  }
  .delete {
    padding: 6px 10px;
    background-color: $grey-light;
    font-size: $font-size-sm;
  }
}
</style>
