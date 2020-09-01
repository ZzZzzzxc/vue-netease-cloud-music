<template>
  <div>
    <div class="header">
      <div
        class="item left"
        :class="[showTabLeft ? `active` : ``]"
        @click="onLeftClick"
      >
        新歌速递
      </div>
      <div
        class="item right"
        :class="[!showTabLeft ? `active` : ``]"
        @click="onRightClick"
      >
        新碟上架
      </div>
    </div>
    <div class="tabs-wrapper">
      <div class="tabs-extra" v-if="!showTabLeft">
        <div
          class="new"
          :class="[type === `new` ? `active` : ``]"
          @click="setNew"
        >
          推荐
        </div>
        <div
          class="hot"
          :class="[type === `hot` ? `active` : ``]"
          @click="setHot"
        >
          全部
        </div>
      </div>
      <tabs v-model="activeName" :center="false" :activeColor="`#909399`">
        <template slot="header">
          <div v-if="showTabLeft" class="play-all" @click="playAll">
            播放全部
          </div>
        </template>
        <tabs-pane
          :label="tab.label"
          :name="tab.name"
          v-for="tab in tabsData"
          :key="tab.name"
        >
          <music-list
            ref="musicList"
            :type="tab.type"
            v-if="showTabLeft"
          ></music-list>
          <album-list v-else :type="type" :area="tab.area"></album-list>
        </tabs-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
const tabsData = [
  { label: "全部", name: "1", type: 0, area: "ALL" },
  { label: "华语", name: "2", type: 7, area: "ZH" },
  { label: "欧美", name: "3", type: 96, area: "EA" },
  { label: "韩国", name: "4", type: 16, area: "KR" },
  { label: "日本", name: "5", type: 8, area: "JP" },
];
import { Tabs, TabsPane } from "@/base/index";
import MusicList from "./music-list";
import AlbumList from "./album-list";
import { formatSong, musicMixin } from "@/utils";
export default {
  name: "Music",
  mixins: [musicMixin],
  components: { Tabs, TabsPane, MusicList, AlbumList },
  data() {
    return {
      activeName: "1",
      showTabLeft: true,
      type: "new",
      tabsData,
    };
  },
  methods: {
    onLeftClick() {
      this.showTabLeft = true;
    },
    onRightClick() {
      this.showTabLeft = false;
    },
    setNew() {
      this.type = "new";
    },
    setHot() {
      this.type = "hot";
    },
    playAll() {
      if (this.$refs.musicList) {
        this.setPlaylistLoading(true);
        const playlist = [];
        this.$refs.musicList[0].list.map(song => {
          playlist.push(
            formatSong({
              id: song.id,
              name: song.name,
              artists: song.artists,
              duration: song.duration,
              mvId: song.mvid,
              img: song.album.picUrl,
              albumId: song.album.id,
              albumName: song.album.name,
            })
          );
        });
        this.setPlaylist(playlist);
        this.setCurrentSong(playlist[0]);
        this.setPlaylistLoading(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.play-all {
  color: $grey-dark;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: $black;
  }
}
.header {
  display: flex;
  justify-content: center;
  margin: 24px auto;
  font-size: $font-size-sm;
  transition: 0.3s;
  .item {
    cursor: pointer;
    height: 28px;
    line-height: 28px;
    max-width: 84px;
    text-align: center;
    width: 50%;
    color: $grey-dark;
    background-color: $white;
    border: 1px $grey-dark solid;
  }
  .left {
    border-radius: 6px 0 0 6px;
  }
  .right {
    border-radius: 0 6px 6px 0;
  }
  .active {
    color: $white;
    background-color: $grey-dark;
  }
}
.tabs-wrapper {
  .tabs-extra {
    display: flex;
    float: right;
    font-size: $font-size-sm;
    color: $grey-dark;
    width: 180px;
    height: 24px;
    line-height: 24px;
    text-align: right;
    cursor: pointer;
    .active {
      color: $black;
    }
    .new {
      margin: 0 12px;
    }
    .hot {
      margin: 0 12px;
    }
  }
}
</style>
