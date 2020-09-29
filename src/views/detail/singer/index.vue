<template>
  <div class="wrapper">
    <loading :loading="loading">
      <div class="header">
        <img class="avatar" v-lazy="getImgUrl(info.picUrl, 200, 200)" />
        <div class="info">
          <div class="name">{{ info.name }}</div>
          <div class="alias">
            <span v-for="alia in info.alias" :key="alia">
              {{ alia }}
            </span>
          </div>
          <div class="music" v-if="info.musicSize">
            专辑数：{{ info.musicSize }}
          </div>
          <div class="album" v-if="info.albumSize">
            单曲数：{{ info.albumSize }}
          </div>
        </div>
      </div>
    </loading>
    <div class="content">
      <tabs v-model="activeName">
        <tabs-pane label="专辑" name="1">
          <albums :albums="albums" :loading="loading"></albums>
        </tabs-pane>
        <tabs-pane label="MV" name="2">
          <mvs :id="id"></mvs>
        </tabs-pane>
        <tabs-pane label="歌手详情" name="3">
          <description :name="info.name" :id="id"></description>
        </tabs-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
import { getArtistAlbum } from "@/api";
import { getImgUrl } from "@/utils";
import Mvs from "./mvs";
import Description from "./description";
import Albums from "./albums";
import { Tabs, TabsPane, Loading } from "@/base";
export default {
  name: "Singer",
  components: {
    Tabs,
    TabsPane,
    Albums,
    Description,
    Mvs,
    Loading
  },
  props: ["id"],
  data() {
    return {
      activeName: "1",
      info: {},
      albums: [],
      loading: false
    };
  },
  watch: {
    id() {
      this.initAlbum();
    }
  },
  methods: {
    getImgUrl,
    async initAlbum() {
      this.loading = true;
      const { id } = this;
      const { hotAlbums, artist } = await getArtistAlbum({ id, limit: 1000 });
      this.albums = hotAlbums;
      this.info = artist;
      this.loading = false;
    }
  },
  created() {
    this.initAlbum();
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
    width: 100%;
    min-height: 200px;
    .avatar {
      height: 200px;
      width: 200px;
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
