<template>
  <Loading :loading="loading">
    <table class="music-list">
      <tr class="album-card" v-for="(data, index) in list" :key="index">
        <td class=" index-wrap">{{ pad(index + 1) }}</td>
        <td class="img-wrap">
          <img class="img" v-lazy="data.album.picUrl" alt="" />
        </td>
        <td class="song">{{ data.name }}</td>
        <td class="artists-wrap ">
          <span
            class="artist"
            v-for="(art, index) in data.artists"
            :key="index"
          >
            {{ art.name }}
          </span>
        </td>
        <td class="">
          {{ data.album.name }}
        </td>
        <td class="duration-wrapper">
          {{ formatTime(data.duration / 1000) }}
        </td>
      </tr>
    </table></Loading
  >
</template>

<script>
import { getTopSong } from "@/api";
import { formatTime, pad } from "@/utils";
import { Loading } from "@/base";
export default {
  name: "music-list",
  components: { Loading },
  props: {
    type: {
      // 0:全部 7:华语 96: 欧美 8:日本 16:韩国
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [],
      loading: false
    };
  },
  methods: {
    pad,
    formatTime,
    async initList() {
      this.loading = true;
      const { data } = await getTopSong({ type: this.type });
      this.list = data;
      this.loading = false;
    }
  },
  created() {
    this.initList();
  }
};
</script>

<style lang="scss" scoped>
.music-list {
  width: 900px;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  color: $grey-dark;
  .album-card {
    &:nth-child(odd) {
      background-color: $grey-light;
    }
    height: 64px;
    line-height: 64px;
    width: 100%;
    font-size: $font-size-sm;
    text-align-last: left;
    position: relative;
    td {
      @include text-ellipsis();
    }
    .index-wrap {
      width: 72px;
      padding: 0 24px;
    }
    .img-wrap {
      width: 72px;
      .img {
        vertical-align: middle;
        height: 48px;
        width: 48px;
      }
    }
    .song {
      color: $black;
    }
    .artists-wrap {
      display: flex;
      .artist {
        &:not(:last-child)::after {
          content: "/";
          display: inline-block;
          width: 16px;
          text-align: center;
        }
      }
    }
    .duration-wrapper {
      text-align: right;
      width: 84px;
      padding: 0 24px;
    }
  }
}
</style>
