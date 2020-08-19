<template>
  <div class="song-list-page-wrap">
    <loading :loading="loading">
      <div class="header">
        <div class="img-wrap">
          <img v-lazy="getImgUrl(list.coverImgUrl, 250, 250)" />
        </div>
        <div class="info-wrap">
          <div class="title-wrap">
            <div class="tag" v-if="!loading">歌单</div>
            <h1 class="title">{{ list.name }}</h1>
          </div>
          <div class="user-wrap" v-if="list.creator">
            <img v-lazy="getImgUrl(list.creator.avatarUrl, 40, 40)" />
            <div class="name">{{ list.creator.nickname }}</div>
            <div class="date" v-if="list.createTime">
              {{ formatDate(list.createTime) }}创建
            </div>
          </div>
          <div class="tool-wrap"></div>
          <div class="tag-wrap" v-if="list.tags">
            标签：<span v-for="(tag, idx) in list.tags" :key="idx">{{
              tag
            }}</span>
          </div>
          <div class="desc-wrap" v-if="list.description">
            <p v-for="(txt, idx) in list.description.split('\n')" :key="idx">
              {{ txt }}
            </p>
          </div>
        </div>
        <div class="count-wrap">
          <div class="count" v-if="list.trackCount">
            歌曲数
            <div>
              {{ formatNumber(list.trackCount) }}
            </div>
          </div>
          <div class="count" v-if="list.playCount">
            播放数
            <div>
              {{ formatNumber(list.playCount) }}
            </div>
          </div>
        </div>
      </div>
    </loading>
    <div class="content">
      <tabs v-model="activeName" :center="false">
        <tabs-pane label="歌曲列表" name="1">
          <song-list :ids="ids"></song-list>
        </tabs-pane>
        <tabs-pane :label="`评论(${this.list.commentCount})`" name="2">
          <comments-list
            :id="id"
            :commentCount="list.commentCount"
          ></comments-list>
        </tabs-pane>
        <tabs-pane label="收藏者" name="3">
          <collectors-list
            :id="id"
            :total="list.subscribedCount"
          ></collectors-list>
        </tabs-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
import { Tabs, TabsPane, Loading } from "@/base";
import { getPlayListDetail } from "@/api";
import { getImgUrl, formatDate, formatNumber } from "@/utils";
import CollectorsList from "./collectors-list";
import SongList from "./song-list";
import CommentsList from "./comments-list";
export default {
  name: "Singer",
  components: {
    Tabs,
    TabsPane,
    CollectorsList,
    SongList,
    CommentsList,
    Loading
  },
  props: ["id"],
  data() {
    return {
      activeName: "1",
      list: {},
      ids: "",
      loading: false
    };
  },
  methods: {
    getImgUrl,
    formatDate,
    formatNumber,
    async initPlayListDetail() {
      this.loading = true;
      const { id } = this;
      const { playlist } = await getPlayListDetail({ id });
      this.list = playlist;
      this.ids = this.list.trackIds.map(({ id }) => id).join(",");
      this.loading = false;
    }
  },
  created() {
    this.initPlayListDetail();
  }
};
</script>

<style lang="scss" scoped>
.song-list-page-wrap {
  padding: 18px 0;
  .header {
    min-height: 200px;
    display: flex;
    justify-content: flex-start;
    padding: 0 34px;
    margin-bottom: 48px;
    .img-wrap {
      width: 30%;
      height: 250px;
      img {
        height: 250px;
        width: 250px;
      }
    }
    .info-wrap {
      width: 50%;
      .title-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .tag {
          margin: 4px 0;
          padding: 2px 8px;
          border: solid 1px $theme-color;
          color: $theme-color;
          font-size: $font-size-sm;
          white-space: nowrap;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 8px;
        }
      }
      .user-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 16px 0;
        img {
          @include circle(40px);
        }
        .name {
          margin: 0 16px 0 6px;
        }
        .date {
          font-size: $font-size-sm;
          color: $grey-dark;
        }
      }
      .tag-wrap {
        font-size: $font-size;
        margin: 16px 0;
        span {
          color: $blue;
          cursor: pointer;
          &:not(:last-child)::after {
            content: "/";
            display: inline-block;
            margin: 0 6px;
            color: $black;
          }
        }
      }
      .desc-wrap {
        p {
          line-height: 1.4;
          &:first-child::before {
            content: "简介：";
          }
        }
      }
    }
    .count-wrap {
      width: 20%;
      color: $grey-dark;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: right;
      font-size: $font-size-sm;
      .count {
        position: relative;
        &:first-child::after {
          position: absolute;
          top: 0;
          right: 0;
          content: "";
          width: 1px;
          height: 80%;
          display: block;
          background-color: $grey-dark;
        }
        padding: 0 12px;
        div {
          font-weight: bold;
          padding: 6px 0;
        }
      }
    }
  }
  .content {
  }
}
</style>
