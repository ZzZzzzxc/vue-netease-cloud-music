<template>
  <div class="mv-page-wrap">
    <div class="content">
      <div class="left">
        <div class="video-wrap">
          <video
            :src="mvPlayInfo.url"
            width="600"
            controls
            controlslist
          ></video>
        </div>
        <card :shadow="`hover`">
          <template slot="header">
            <div>{{ `听友评论（${total}）` }}</div>
          </template>
          <div class="comment-wrap">
            <comment-list
              v-if="current === 1"
              :loading="commentLoading"
              :title="`精彩评论`"
              :comments="hotComments"
            />
            <CommentList
              :loading="commentLoading"
              :title="`最新评论（${total}）`"
              :comments="comments"
            />
            <div class="pagination-wrap">
              <pagination
                v-model="current"
                :limit="limit"
                :total="total"
              ></pagination>
            </div>
          </div>
        </card>
      </div>
      <div class="right">
        <div class="info-wrap">
          <card :shadow="`hover`">
            <template slot="header">
              <p class="card-header">
                MV介绍
              </p>
            </template>
            <div class="card-content">
              <div class="date">
                <p>发布时间：{{ mvDetail.publishTime }}</p>
                <p>播放次数：{{ formatNumber(mvDetail.playCount) }}次</p>
              </div>
              <p class="desc">{{ mvDetail.desc }}</p>
            </div>
          </card>
        </div>
        <div class="simi-wrap">
          <card :shadow="`hover`">
            <template slot="header">
              <div class="card-header">相关推荐</div>
            </template>
            <ul class="simi-list">
              <li
                class="item"
                v-for="mv in simiMvs"
                :key="mv.id"
                @click="toDetail(mv.id)"
              >
                <horizontal-card
                  :duration="formatTime(mv.duration / 1000)"
                  :count="formatNumber(mv.playCount)"
                  :title="mv.name"
                  :artist="mv.artistName"
                >
                  <template slot="banner">
                    <mv-card
                      :imgUrl="mv.cover"
                      :count="formatNumber(mv.playCount).toString()"
                    ></mv-card>
                  </template>
                </horizontal-card>
              </li>
            </ul>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMvDetail,
  getMvDetailInfo,
  getMvUrl,
  getSimiMv,
  getMvComment
} from "@/api";
import { CommentList, MvCard, HorizontalCard } from "@/components";
import { Pagination, Card } from "@/base";
import { formatNumber, getImgUrl, formatTime } from "@/utils";
export default {
  name: "Mv",
  props: ["id"],
  components: { CommentList, Pagination, Card, MvCard, HorizontalCard },
  data() {
    return {
      simiMvs: [],
      mvDetail: {},
      mvDetailInfo: {},
      mvPlayInfo: {},
      limit: 20, // 每页条数
      current: 1, // 评论页
      total: 0, // 评论总数
      hotComments: [], // 热门评论
      comments: [], // 评论
      commentLoading: false // 评论是否在加载中
    };
  },
  watch: {
    current() {
      // 获取新一页的评论数据
      this.getCommentData();
    },
    id() {
      this.initData();
      this.getCommentData();
      this.current = 1;
    }
  },
  methods: {
    formatNumber,
    getImgUrl,
    formatTime,
    async initData() {
      const { id } = this;
      const [
        { data: mvDetail },
        { data: mvDetailInfo },
        { data: mvPlayInfo },
        { mvs: simiMvs }
      ] = await Promise.all([
        getMvDetail({ mvid: id }),
        getMvDetailInfo({ mvid: id }),
        getMvUrl({ id }),
        getSimiMv({ mvid: id })
      ]);
      this.mvDetail = mvDetail;
      this.mvDetailInfo = mvDetailInfo;
      this.mvPlayInfo = mvPlayInfo;
      this.simiMvs = simiMvs;
    },
    async getCommentData() {
      this.commentLoading = true;
      const { id, limit, current } = this;
      const { total, hotComments, comments } = await getMvComment({
        id,
        limit,
        offset: limit * (current - 1)
      });
      this.total = total;
      this.hotComments = hotComments;
      this.comments = comments;
      this.commentLoading = false;
    },
    toDetail(id) {
      if (id) {
        this.$router.push({ name: "Mv", params: { id } });
      }
    }
  },
  created() {
    this.initData();
    this.getCommentData();
  }
};
</script>

<style lang="scss" scoped>
.mv-page-wrap {
  .content {
    display: flex;
    padding: 0 36px;
    .left {
      width: 70%;
      padding: 12px;
      margin: 30px 0;
      .video-wrap {
      }
      .comment-wrap {
        padding-bottom: 24px;
        .pagination-wrap {
          float: right;
        }
      }
    }
    .right {
      margin: 30px 0;
      width: 30%;
      padding: 12px;
      .info-wrap {
        margin-bottom: 64px;
        .card-header {
          font-size: $font-size-lg;
        }
        .card-content {
          .date {
            font-size: $font-size-sm;
            line-height: 1.6;
            margin-bottom: 6px;
            color: $grey-dark;
          }
          .desc {
            font-size: $font-size;
            line-height: 1.2;
            color: $grey-dark;
            letter-spacing: 0.1em;
          }
        }
      }
      .simi-wrap {
        .card-header {
          font-size: $font-size-lg;
        }
        .simi-list {
          .item {
            cursor: pointer;
            margin-bottom: 12px;
            transition: 0.3s;
            padding: 12px 6px 8px 6px;
            border-radius: 6px;
            &:hover {
              background-color: $grey;
            }
          }
        }
      }
    }
  }
}
</style>
