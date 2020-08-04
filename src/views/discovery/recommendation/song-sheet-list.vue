<template>
  <ul class="list-wrap">
    <li class="list-item" v-for="sheet in sheetList" :key="sheet.id">
      <PlaylistCard
        :imgUrl="sheet.picUrl"
        :desc="sheet.copywriter"
        :name="sheet.name"
        :count="formatNumber(sheet.playCount).toString()"
      />
    </li>
  </ul>
</template>

<script>
import { getPersonalSheet } from "@/api";
import { PlaylistCard } from "@/components";
import { formatNumber } from "@/utils";
export default {
  name: "SongSheetList",
  components: {
    PlaylistCard
  },
  data() {
    return {
      sheetList: []
    };
  },
  methods: {
    formatNumber,
    async initSheetList() {
      const { result } = await getPersonalSheet();
      this.sheetList = result;
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
