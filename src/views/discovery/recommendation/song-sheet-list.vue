<template>
  <Loading :loading="loading">
    <ul class="list-wrap">
      <li class="list-item" v-for="sheet in sheetList" :key="sheet.id">
        <PlaylistCard
          @click="handleGetSong(sheet.id)"
          :id="sheet.id"
          :imgUrl="sheet.picUrl"
          :desc="sheet.copywriter"
          :name="sheet.name"
          :count="formatNumber(sheet.playCount).toString()"
        />
      </li></ul
  ></Loading>
</template>

<script>
import { getPersonalSheet, getPlayListDetail, getSongDetail } from "@/api";
import { PlaylistCard } from "@/components";
import { formatNumber, musicMixin, formatSong } from "@/utils";
import { Loading } from "@/base";
export default {
  name: "SongSheetList",
  mixins: [musicMixin],
  components: {
    PlaylistCard,
    Loading
  },
  data() {
    return {
      sheetList: [],
      loading: false
    };
  },
  methods: {
    formatNumber,
    // 初始化歌单列表
    async initSheetList() {
      this.loading = true;
      const { result } = await getPersonalSheet();
      this.sheetList = result;
      this.loading = false;
    },
    // 点击播放获取歌单中的歌曲 id 数组
    async handleGetSong(id) {
      this.setPlaylistLoading(true);
      const { playlist } = await getPlayListDetail({ id });
      const { trackIds } = playlist;
      await this.getSongDetail(trackIds.map(({ id }) => id).join(","));
      this.setPlaylistLoading(false);
    },
    // 获取歌曲数组
    async getSongDetail(ids) {
      const { songs } = await getSongDetail({ ids });
      const playlist = [];
      songs.map(song => {
        console.log(song);
        playlist.push(
          formatSong({
            id: song.id,
            name: song.name,
            artists: song.ar,
            duration: song.dt,
            mvId: song.mv,
            img: song.al.picUrl,
            albumId: song.al.id,
            albumName: song.al.name
          })
        );
      });
      this.setPlaylist(playlist);
      this.setCurrentSong(playlist[0]);
    }
  },
  created() {
    this.initSheetList();
  }
};
</script>

<style lang="scss" scoped>
@include list(20%);
</style>
