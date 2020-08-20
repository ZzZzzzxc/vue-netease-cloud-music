<template>
  <loading :loading="loading">
    <div class="comment-list-wrap">
      <div class="title">{{ title }}</div>
      <ul class="comment-list">
        <li
          class="comment-item"
          v-for="comment in comments"
          :key="comment.commentId"
        >
          <comment v-bind="formatCommentData(comment)"></comment>
        </li>
      </ul></div
  ></loading>
</template>

<script>
import { formatDate } from "@/utils";
import { Comment } from "@/components";
import { Loading } from "@/base";
export default {
  name: "CommentList",
  components: { Comment, Loading },
  props: [`title`, `comments`, `loading`],
  methods: {
    // 格式化评论数据
    formatCommentData(comment) {
      const res = {
        avatar: comment.user.avatarUrl,
        name: comment.user.nickname,
        date: formatDate(comment.time),
        content: comment.content,
        count: comment.likedCount
      };
      if (comment.beReplied.length) {
        res.replyName = comment.beReplied[0].user.nickname;
        res.replyContent = comment.beReplied[0].content;
      }
      return res;
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-list-wrap {
  width: 100%;
  font-size: $font-size-sm;
  color: $grey-dark;
  .title {
    padding: 6px 0;
  }
  .comment-list {
    margin-bottom: 24px;
    .comment-item {
      padding: 16px 0;
      border-bottom: solid $grey 1px;
    }
  }
}
</style>
