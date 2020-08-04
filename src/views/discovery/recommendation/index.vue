<template>
  <div>
    <Swiper>
      <SwiperItem v-for="banner in banners" :key="banner.imageUrl">
        <img class="banner" v-lazy="getImgUrl(banner.imageUrl, 1000, 400)" />
      </SwiperItem>
    </Swiper>
    <div class="card-wrapper">
      <Card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div>主播电台</div>
            <div>更多</div>
          </div>
        </template>
        <RadioStationList />
      </Card>
    </div>
    <div class="card-wrapper">
      <Card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div>独家放送</div>
            <div>更多</div>
          </div>
        </template>
        <PrivateContentList />
      </Card>
    </div>
    <div class="card-wrapper">
      <Card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div>最新音乐</div>
            <div>更多</div>
          </div>
        </template>
        <div class="card-content">
          <SongList />
        </div>
      </Card>
    </div>
    <div class="card-wrapper">
      <Card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div>推荐歌单</div>
            <div>更多</div>
          </div>
        </template>
        <SongSheetList />
      </Card>
    </div>
    <div class="card-wrapper">
      <Card :shadow="`hover`">
        <template slot="header">
          <div class="card-header">
            <div>推荐MV</div>
            <div>更多</div>
          </div>
        </template>
        <MvList />
      </Card>
    </div>
  </div>
</template>

<script>
import { getBanner } from "@/api";
import { Swiper, SwiperItem, Card } from "@/base";
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
      banners: []
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
    MvList
  },
  methods: {
    getImgUrl,
    async initBanner() {
      const { banners } = await getBanner();
      this.banners = banners;
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
