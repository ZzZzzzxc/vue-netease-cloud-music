<template>
  <Loading :loading="loading">
    <ul class="list-wrap">
      <li class="list-item" v-for="sheet in sheetList" :key="sheet.id">
        <PlaylistCard
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
import { getPersonalSheet } from "@/api";
import { PlaylistCard } from "@/components";
import { formatNumber } from "@/utils";
import { Loading } from "@/base";
export default {
  name: "SongSheetList",
  components: {
    PlaylistCard,
    Loading,
  },
  data() {
    return {
      sheetList: [],
      loading: false,
    };
  },
  methods: {
    formatNumber,
    async initSheetList() {
      this.loading = true;
      const { result } = await getPersonalSheet();
      this.sheetList = result;
      this.loading = false;
    },
  },
  created() {
    this.initSheetList();
  },
};
</script>

<style lang="scss" scoped>
@include list(20%);
</style>
