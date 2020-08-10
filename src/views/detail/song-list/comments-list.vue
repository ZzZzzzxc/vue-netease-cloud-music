<template>
  <Loading :loading="loading">
    <div class="comment-page-wrap">
      <div class="title" v-show="currentPage === 1">精彩评论</div>
      <ul class="comment-list" v-show="currentPage === 1">
        <li
          class="comment-item"
          v-for="comment in hotComments"
          :key="comment.commentId"
        >
          <Comment v-bind="formatData(comment)" />
        </li>
      </ul>
      <div class="title">最新评论({{ commentCount }})</div>
      <ul class="comment-list">
        <li
          class="comment-item"
          v-for="comment in comments"
          :key="comment.commentId"
        >
          <Comment v-bind="formatData(comment)" />
        </li>
      </ul>
      <div class="pagination-wrap">
        <Pagination
          v-model="currentPage"
          :limit="limit"
          :total="commentCount"
        />
      </div>
    </div>
  </Loading>
</template>

<script>
import { getPlayListComment } from "@/api";
import { Loading, Pagination } from "@/base";
import { Comment } from "@/components";
import { formatDate } from "@/utils";
export default {
  name: "CommentsList",
  components: { Loading, Comment, Pagination },
  props: ["id", "commentCount"],
  data() {
    return {
      hotComments: [],
      comments: [],
      loading: false,
      currentPage: 1,
      limit: 60,
      contentRef: null,
    };
  },
  computed: {
    params() {
      const { id, limit, currentPage } = this;
      return {
        id,
        limit,
        offset: limit * (currentPage - 1),
      };
    },
  },
  watch: {
    params(params) {
      this.getListData(params);
    },
  },
  methods: {
    formatData(comment) {
      const res = {
        avatar: comment.user.avatarUrl,
        name: comment.user.nickname,
        date: formatDate(comment.time),
        content: comment.content,
        count: comment.likedCount,
      };
      if (comment.beReplied.length) {
        res.replyName = comment.beReplied[0].user.nickname;
        res.replyContent = comment.beReplied[0].content;
      }
      return res;
    },
    async getListData() {
      this.contentRef &&
        this.contentRef.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
      this.loading = true;
      const { params } = this;
      const { hotComments, comments } = await getPlayListComment(params);
      this.hotComments = hotComments;
      this.comments = comments;
      this.loading = false;
    },
  },
  created() {
    this.contentRef = document.getElementById(`content_ref`);
    this.getListData();
  },
};
</script>

<style lang="scss" scoped>
.comment-page-wrap {
  width: 96%;
  margin: 0 2%;
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
  .pagination-wrap {
    float: right;
  }
}
</style>
