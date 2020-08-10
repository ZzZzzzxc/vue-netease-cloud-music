<template>
  <Loading :loading="loading">
    <table class="music-list">
      <tr class="list-header">
        <th>编号</th>
        <th>封面</th>
        <th>歌名</th>
        <th>作者</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      <tr class="album-card" v-for="(data, index) in list" :key="index">
        <td class=" index-wrap">{{ pad(index + 1) }}</td>
        <td class="img-wrap">
          <img class="img" v-lazy="data.al.picUrl" alt="" />
        </td>
        <td class="song">{{ data.name }}</td>
        <td class="artists-wrap ">
          <span class="artist" v-for="(art, index) in data.ar" :key="index">
            {{ art.name }}
          </span>
        </td>
        <td class="">
          {{ data.name }}
        </td>
        <td class="duration-wrapper">
          {{ formatTime(data.dt / 1000) }}
        </td>
      </tr>
    </table>
  </Loading>
</template>

<script>
import { getSongDetail } from "@/api";
import { formatTime, pad } from "@/utils";
import { Loading } from "@/base";
export default {
  name: "music-list",
  props: ["ids"],
  components: { Loading },
  data() {
    return {
      list: [],
      loading: false
    };
  },
  watch: {
    ids() {
      this.initList();
    }
  },
  methods: {
    pad,
    formatTime,
    async initList() {
      this.loading = true;
      const { ids } = this;
      if (ids) {
        const { songs } = await getSongDetail({ ids });
        this.list = songs;
      }
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
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  color: $grey-dark;
  .list-header {
    text-align: left;
    th {
      padding: 6px 0;
      color: $black;
      &:first-child {
        padding: 0 24px;
      }
      &:last-child {
        padding: 0 24px;
      }
    }
  }
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
