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
    <Card
      :customStyle="customStyle"
      :title="`主播电台`"
      :triggerLabel="`更多`"
      :triggerCallback="toMore"
      :flexWrap="false"
    >
      <template v-if="djProgram.length">
        <CardItem
          v-for="program in djProgram"
          :key="program.id"
          :image="program.picUrl"
          :width="180"
          :height="140"
          :title="program.copywriter"
        >
          <div slot="footer">
            {{ program.name }}
          </div>
        </CardItem>
      </template>
    </Card>
    <Card
      :customStyle="customStyle"
      :title="`独家放送`"
      :triggerLabel="`更多`"
      :triggerCallback="toMore"
      :flexWrap="false"
      ><template v-if="privatecontent.length">
        <CardItem
          v-for="content in privatecontent"
          :key="content.id"
          :image="content.picUrl"
          :width="340"
          :height="140"
          :label="content.copywriter"
        >
          <div slot="footer">{{ content.name }}</div>
        </CardItem></template
      >
    </Card>
    <Card
      :customStyle="customStyle"
      :title="`最新音乐`"
      :triggerLabel="`更多`"
      :triggerCallback="toMore"
    >
      <SongList :songList="newSong" />
    </Card>
    <Card
      :customStyle="customStyle"
      :title="`推荐歌单`"
      :triggerLabel="`更多`"
      :triggerCallback="toMore"
      :flexWrap="true"
    >
      <template v-if="sheet.length">
        <CardItem
          v-for="song in sheet"
          :key="song.id"
          :image="song.picUrl"
          :width="180"
          :height="180"
          :title="formatNumber(song.playCount).toString()"
          :titlePlacement="`top`"
          :label="song.copywriter"
          ><div slot="footer">
            {{ song.name }}
          </div></CardItem
        ></template
      >
    </Card>
    <Card
      :customStyle="customStyle"
      :title="`推荐MV`"
      :triggerLabel="`更多`"
      :triggerCallback="toMore"
      ><template v-if="mvs.length">
        <CardItem
          v-for="mv in mvs"
          :key="mv.id"
          :image="mv.picUrl"
          :width="380"
          :height="180"
          :title="formatNumber(mv.playCount).toString()"
          :titlePlacement="`top`"
          :label="mv.copywriter"
          ><div slot="footer">
            {{ mv.name }}
          </div></CardItem
        ></template
      >
    </Card>
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
import { Swiper, SwiperItem } from "@/base/index";
import { Card, CardItem, SongList } from "@/components";
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
  components: { Swiper, SwiperItem, Card, CardItem, SongList },
  methods: {
    formatNumber,
    toMore() {},
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
</style>
