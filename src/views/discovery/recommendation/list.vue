<template>
  <loading :loading="loading" :customStyle="{ width: `100%` }">
    <div class="song-list">
      <div
        class="item"
        @click.stop="handleGetSong(item)"
        v-for="(item, index) in newSongList"
        :key="item.id"
      >
        <div class="content">
          <div class="order">{{ index + 1 }}</div>
          <img class="img" v-lazy="item.picUrl" />
          <div class="detail">
            <div class="song">{{ item.song.name }}</div>
            <div class="singer">
              <span v-for="artist in item.song.artists" :key="artist.id">
                {{ artist.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </loading>
</template>

<script>
import { getPersonalNewSong } from "@/api";
import { Loading } from "@/base";
import { musicMixin, formatSong } from "@/utils";
export default {
  name: "SongList",
  components: { Loading },
  mixins: [musicMixin],
  data() {
    return {
      newSongList: [],
      loading: false
    };
  },
  methods: {
    async initNewSong() {
      this.loading = true;
      const { result } = await getPersonalNewSong();
      this.newSongList = result;
      this.loading = false;
    },
    handleGetSong(item) {
      this.setPlaylistLoading(true);
      const { song, picUrl } = item;
      this.addToPlaylist(
        formatSong({
          id: song.id,
          name: song.name,
          artists: song.artists,
          duration: song.duration,
          mvId: song.mvid,
          img: picUrl,
          albumId: song.album.id,
          albumName: song.album.name
        })
      );
      this.setPlaylistLoading(false);
    }
  },
  created() {
    this.initNewSong();
  }
};
</script>

<style lang="scss" scoped>
.song-list {
  width: 100%;
  border: 1px $grey solid;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 322px;
  .item {
    cursor: pointer;
    width: 50%;
    height: 64px;
    &:nth-child(n) {
      border-right: 0.5px $grey solid;
    }
    &:nth-child(2) {
      background-color: $grey-light;
    }
    &:nth-child(4) {
      background-color: $grey-light;
    }
    &:nth-child(7) {
      background-color: $grey-light;
    }
    &:nth-child(9) {
      background-color: $grey-light;
    }
    &:hover {
      background-color: $grey;
    }
    .content {
      display: flex;
      padding: 10px 16px;
      font-weight: 100;
      justify-content: flex-start;
      align-items: center;
      height: 64px;
      font-size: $font-size-sm;
      .order {
        margin-right: 16px;
        width: 24px;
        color: $grey-dark;
      }
      .img {
        margin-right: 16px;
        height: 100%;
      }
      .detail {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .song {
          height: 24px;
          line-height: 24px;
          width: 200px;
          @include text-ellipsis();
        }
        .singer {
          height: 24px;
          line-height: 24px;
          width: 200px;
          @include text-ellipsis();
        }
      }
    }
  }
}
</style>
