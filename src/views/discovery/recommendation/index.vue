<template>
  <div>
    <loading :loading="loading">
      <swiper>
        <swiper-item v-for="banner in banners" :key="banner.imageUrl">
          <img class="banner" v-lazy="getImgUrl(banner.imageUrl, 1000, 400)" />
        </swiper-item> </swiper
    ></loading>
    <div class="card-wrapper">
      <card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div class="title">主播电台</div>
            <div class="more">更多</div>
          </div>
        </template>
        <radio-station-list></radio-station-list>
      </card>
    </div>
    <div class="card-wrapper">
      <card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div class="title">独家放送</div>
            <div class="more">更多</div>
          </div>
        </template>
        <private-content-list></private-content-list>
      </card>
    </div>
    <div class="card-wrapper">
      <card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div class="title">最新音乐</div>
            <div class="more" @click="toMorePage('NewMusic')">更多</div>
          </div>
        </template>
        <div class="card-content">
          <song-list></song-list>
        </div>
      </card>
    </div>
    <div class="card-wrapper">
      <card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div class="title">推荐歌单</div>
            <div class="more" @click="toMorePage('SongList')">更多</div>
          </div>
        </template>
        <song-sheet-list></song-sheet-list>
      </card>
    </div>
    <div class="card-wrapper">
      <card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div class="title">推荐MV</div>
            <div class="more">更多</div>
          </div>
        </template>
        <mv-list></mv-list>
      </card>
    </div>
  </div>
</template>

<script>
import { getBanner } from "@/api";
import { Swiper, SwiperItem, Card, Loading } from "@/base";
import { getImgUrl } from "@/utils";
import SongList from "./list";
import RadioStationList from "./radio-station-list";
import PrivateContentList from "./private-content-list";
import SongSheetList from "./song-sheet-list";
import MvList from "./mv-list";
export default {
  name: "Recommend",
  data() {
    return {
      banners: [],
      loading: false
    };
  },
  components: {
    Swiper,
    SwiperItem,
    Card,
    SongList,
    RadioStationList,
    PrivateContentList,
    SongSheetList,
    MvList,
    Loading
  },
  methods: {
    getImgUrl,
    async initBanner() {
      this.loading = true;
      const { banners } = await getBanner();
      this.banners = banners;
      this.loading = false;
    },
    toMorePage(name) {
      this.$router.push({ name });
    }
  },
  created() {
    this.initBanner();
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 100%;
  border-radius: 4px;
}
.card-wrapper {
  margin: 60px 0;
  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 0;
    .title {
      font-size: $font-size-lg;
    }
    .more {
      font-size: $font-size-sm;
      color: $grey-dark;
      cursor: pointer;
      &::after {
        content: ">";
      }
    }
  }
  @include list(16.6%);
  .card-content {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
    .wrapper {
      flex-grow: 1;
      margin: 8px 4px;
    }
  }
}
</style>
