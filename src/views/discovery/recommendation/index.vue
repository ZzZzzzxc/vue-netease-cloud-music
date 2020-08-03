<template>
  <div>
    <Swiper>
      <SwiperItem v-for="banner in banners" :key="banner.imageUrl">
        <div
          class="banner"
          :style="{ backgroundImage: `url(${banner.imageUrl})` }"
        />
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
        <div class="card-content">
          <div class="wrapper" v-for="program in djProgram" :key="program.id">
            <RadioStationCard
              :imgUrl="program.picUrl"
              :title="program.copywriter"
              :footer="program.name"
            />
          </div>
        </div>
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
        <div class="card-content">
          <div
            class="wrapper"
            v-for="(content, idx) in privatecontent"
            :key="content.id"
          >
            <MvCard
              v-show="idx < 3"
              :imgUrl="content.picUrl"
              :footer="content.name"
            />
          </div>
        </div>
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
          <SongList :songList="newSong" />
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
        <div class="card-content">
          <div class="wrapper" v-for="song in sheet" :key="song.id">
            <MvCard
              :imgUrl="song.picUrl"
              :count="formatNumber(song.playCount).toString()"
              :title="song.copywriter"
              :footer="song.name"
              :height="172"
              :width="172"
            />
          </div>
        </div>
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
        <div class="card-content">
          <div class="wrapper" v-for="(mv, idx) in mvs" :key="mv.id">
            <MvCard
              v-show="idx < 3"
              :imgUrl="mv.picUrl"
              :count="formatNumber(mv.playCount).toString()"
              :title="mv.copywriter"
              :footer="mv.name"
            />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import {
  getBanner,
  getPersonalDjProgram,
  getPersonalPrivatecontent,
  getPersonalNewSong,
  getPersonalSheet,
  getPersonalMv
} from "@/api";
import { Swiper, SwiperItem, Card } from "@/base/index";
import { RadioStationCard, MvCard } from "@/components";
import SongList from "./list";
import { formatNumber } from "@/utils";
export default {
  name: "Recommend",
  data() {
    return {
      customStyle: {
        margin: "60px 0"
      },
      banners: [],
      djProgram: [],
      privatecontent: [],
      newSong: [],
      sheet: [],
      mvs: []
    };
  },
  components: {
    Swiper,
    SwiperItem,
    Card,
    SongList,
    RadioStationCard,
    MvCard
  },
  methods: {
    formatNumber,
    async initBanner() {
      const { banners } = await getBanner();
      this.banners = banners;
    },
    async initDjProgram() {
      const { result } = await getPersonalDjProgram();
      this.djProgram = result;
    },
    async initPrivatecontent() {
      const { result } = await getPersonalPrivatecontent();
      this.privatecontent = result;
    },
    async initNewSong() {
      const { result } = await getPersonalNewSong();
      this.newSong = result;
    },
    async initSheet() {
      const { result } = await getPersonalSheet(10);
      this.sheet = result;
    },
    async initMv() {
      const { result } = await getPersonalMv(10);
      this.mvs = result;
    }
  },
  created() {
    this.initBanner();
    this.initDjProgram();
    this.initPrivatecontent();
    this.initNewSong();
    this.initSheet();
    this.initMv();
  }
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.card-wrapper {
  margin: 60px 0;
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-content {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
    .wrapper {
      margin: 18px 10px;
    }
  }
}
</style>
