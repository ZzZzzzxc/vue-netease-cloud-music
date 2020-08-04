<template>
  <div class="wrapper">
    <div class="header">
      <img class="avatar" v-lazy="getImgUrl(info.picUrl, 200, 200)" />
      <div class="info">
        <div class="name">{{ info.name }}</div>
        <div class="alias">
          <span v-for="alia in info.alias" :key="alia">
            {{ alia }}
          </span>
        </div>
        <div class="music">专辑数：{{ info.musicSize }}</div>
        <div class="album">单曲数：{{ info.albumSize }}</div>
      </div>
    </div>
    <div class="content">
      <Tabs v-model="activeName">
        <TabsPane label="专辑" name="1">
          <Albums :albums="albums" />
        </TabsPane>
        <TabsPane label="MV" name="2">
          <Mvs :mvs="mvs" />
        </TabsPane>
        <TabsPane label="歌手详情" name="3">
          <Description
            :name="info.name"
            :briefDesc="desc.briefDesc"
            :introduction="desc.introduction"
            :topicData="desc.topicData"
          />
        </TabsPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import {
  getArtistDesc,
  getArtistAlbum,
  getArtistMv,
  getSimiArtist
} from "@/api";
import { getImgUrl } from "@/utils";
import Mvs from "./mvs";
import Description from "./description";
import Albums from "./albums";
import { Tabs, TabsPane } from "@/base/index";
export default {
  name: "Singer",
  components: {
    Tabs,
    TabsPane,
    Albums,
    Description,
    Mvs
  },
  props: ["id"],
  data() {
    return {
      activeName: "1",
      info: {},
      desc: {},
      albums: [],
      mvs: []
    };
  },
  methods: {
    getImgUrl,
    async initDesc() {
      const id = this.id;
      this.desc = await getArtistDesc({ id });
    },
    async initAlbum() {
      const id = this.id;
      const { hotAlbums, artist } = await getArtistAlbum({ id, limit: 1000 });
      this.albums = hotAlbums;
      this.info = artist;
    },
    async initMv() {
      const id = this.id;
      const { mvs } = await getArtistMv({ id, limit: 1000 });
      this.mvs = mvs;
    },
    async initSimiArtist() {
      const id = this.id;
      await getSimiArtist({ id });
    }
  },
  created() {
    this.initDesc();
    this.initAlbum();
    this.initMv();
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 18px 0;
  .header {
    display: flex;
    justify-content: flex-start;
    padding: 0 34px;
    .avatar {
      background-size: cover;
      background-repeat: no-repeat;
      margin-right: 24px;
    }
    .info {
      .name {
        font-size: 26px;
      }
      .alias {
        font-size: $font-size-sm;
        margin: 18px 0;
      }
      .album {
        margin: 6px 0;
        font-size: $font-size-sm;
      }
      .music {
        margin: 6px 0;
        font-size: $font-size-sm;
      }
    }
  }
}
</style>
