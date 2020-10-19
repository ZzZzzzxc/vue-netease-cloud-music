<template>
  <div class="song-wrap">
    <loading :loading="loading">
      <ul class="list">
        <li
          class="item"
          @click="handlePlay(song)"
          v-for="(song, idx) in data"
          :key="song.id"
        >
          <div class="idx">{{ idx + 1 }}</div>
          <div class="base">
            <div class="name">
              <span v-html="brightenKeyword(song.name, `${keywords}`)"></span>
              <span class="alias" v-if="song.alias.length"
                >({{ song.alias.join(",") }})</span
              >
            </div>
          </div>
          <div class="creator">
            by
            <span
              v-html="
                brightenKeyword(getArtistisText(song.artists), `${keywords}`)
              "
            ></span>
          </div>
          <div class="creator">
            <span
              v-html="brightenKeyword(song.album.name, `${keywords}`)"
            ></span>
          </div>
          <div class="creator">{{ formatTime(song.duration / 1000) }}</div>
        </li>
      </ul>
    </loading>
    <div class="pagination-wrap">
      <pagination v-model="current" :limit="limit" :total="count"></pagination>
    </div>
  </div>
</template>

<script>
import { getSearchData } from "@/api";
import {
  brightenKeyword,
  getArtistisText,
  formatTime,
  formatSong,
  musicMixin
} from "@/utils";
import { Pagination, Loading } from "@/base";
export default {
  name: "",
  props: ["keywords", "type"],
  mixins: [musicMixin],
  components: { Pagination, Loading },
  data() {
    return {
      current: 1,
      limit: 30,
      data: [],
      count: 0,
      loading: false
    };
  },
  computed: {
    offset() {
      return this.limit * (this.current - 1);
    }
  },
  watch: {
    current() {
      this.getData();
    },
    keywords() {
      this.current = 1;
      this.getData();
    }
  },
  methods: {
    formatTime,
    brightenKeyword,
    getArtistisText,
    handlePlay(song) {
      const {
        id,
        name,
        album: { name: albumName, id: albumId, picUrl: img },
        artists,
        mvid: mvId,
        duration
      } = song;
      this.addToPlaylist(
        formatSong({
          id,
          name,
          img,
          artists,
          duration,
          albumId,
          albumName,
          mvId
        })
      );
    },
    async getData() {
      this.data = [];
      this.loading = true;
      const { keywords, type, offset, limit } = this;
      const {
        result: { songCount, songs }
      } = await getSearchData({
        keywords,
        type,
        offset,
        limit
      });
      this.data = songs;
      this.count = songCount;
      this.$emit("count", songCount);
      this.loading = false;
    }
  },
  mounted() {
    this.$nextTick(this.getData);
  }
};
</script>

<style lang="scss" scoped>
.song-wrap {
  .list {
    min-height: 300px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      transition: 0.3s;
      cursor: pointer;
      font-size: $font-size-sm;
      height: 42px;
      .idx {
        width: 10%;
      }
      .base {
        display: flex;
        align-items: center;
        width: 30%;
        .name {
          .alias {
            color: $grey-dark;
          }
        }
      }
      .creator {
        width: 25%;
        color: $grey-dark;
      }
      &:nth-child(even) {
        background-color: $grey-light;
      }
      &:hover {
        background-color: $grey;
      }
    }
  }
  .pagination-wrap {
    float: right;
    margin: 24px 0;
  }
}
</style>
