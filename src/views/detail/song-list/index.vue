<template>
  <div class="song-list-page-wrap">
    <div class="header">
      <div class="img-wrap">
        <img v-lazy="getImgUrl(list.coverImgUrl, 250, 250)" />
      </div>
      <div class="info-wrap">
        <div class="title-wrap">
          <div class="tag">歌单</div>
          <h1 class="title">{{ list.name }}</h1>
        </div>
        <div class="user-wrap" v-if="list.creator">
          <img v-lazy="getImgUrl(list.creator.avatarUrl, 40, 40)" />
          <div class="name">{{ list.creator.nickname }}</div>
          <div class="date">
            {{ timestampToTime(list.creator.birthday) }}创建
          </div>
        </div>
        <div class="tool-wrap"></div>
        <div class="tag-wrap">
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
        <div class="count">
          歌曲数
          <div>
            {{ formatNumber(list.trackCount) }}
          </div>
        </div>
        <div class="count">
          播放数
          <div>
            {{ formatNumber(list.playCount) }}
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <Tabs v-model="activeName" :center="false">
        <TabsPane label="歌曲列表" name="1">
          <SongList :ids="ids" />
        </TabsPane>
        <TabsPane label="评论" name="2">
          <CommentsList />
        </TabsPane>
        <TabsPane label="收藏者" name="3">
          <CollectorsList :id="id" :total="list.subscribedCount" />
        </TabsPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { Tabs, TabsPane } from "@/base";
import { getPlayListDetail } from "@/api";
import { getImgUrl, timestampToTime, formatNumber, ObjArr2Arr } from "@/utils";
import CollectorsList from "./collectors-list";
import SongList from "./song-list";
import CommentsList from "./comments-list";
export default {
  name: "Singer",
  components: { Tabs, TabsPane, CollectorsList, SongList, CommentsList },
  props: ["id"],
  data() {
    return {
      activeName: "1",
      list: {},
      ids: ""
    };
  },
  methods: {
    ObjArr2Arr,
    getImgUrl,
    timestampToTime,
    formatNumber,
    async initPlayListDetail() {
      const id = this.id;
      const { playlist } = await getPlayListDetail({ id });
      this.list = playlist;
      this.ids = ObjArr2Arr(this.list.trackIds, "id").join(",");
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
    display: flex;
    justify-content: flex-start;
    padding: 0 34px;
    margin-bottom: 48px;
    .img-wrap {
      width: 30%;
      height: 250px;
    }
    .info-wrap {
      width: 50%;
      .title-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .tag {
          padding: 2px 8px;
          border: solid 1px $theme-color;
          color: $theme-color;
          font-size: $font-size-sm;
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
          width: 40px;
          height: 40px;
          border-radius: 50%;
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
