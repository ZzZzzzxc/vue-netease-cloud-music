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
import { formatNumber, ObjArr2Arr, musicMixin } from "@/utils";
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
      await this.getSongDetail(ObjArr2Arr(trackIds, "id").join(","));
      this.setPlaylistLoading(false);
    },
    // 获取歌曲数组
    async getSongDetail(ids) {
      const { songs } = await getSongDetail({ ids });
      this.setPlaylist(songs);
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
