<template>
  <Loading :loading="loading">
    <ul class="list-wrap">
      <li class="list-item" v-for="mv in mvs" :key="mv.id">
        <MvCard
          :imgUrl="mv.picUrl"
          :count="formatNumber(mv.playCount).toString()"
          :desc="mv.copywriter"
          :name="mv.name"
          :artistName="mv.artistName"
        />
      </li></ul
  ></Loading>
</template>

<script>
import { getPersonalMv } from "@/api";
import { MvCard } from "@/components";
import { formatNumber } from "@/utils";
import { Loading } from "@/base";
export default {
  name: "MvList",
  components: {
    MvCard,
    Loading,
  },
  data() {
    return {
      mvs: [],
      Loading,
    };
  },
  methods: {
    formatNumber,
    async initMv() {
      this.loading = true;
      const { result } = await getPersonalMv();
      this.mvs = result;
      this.loading = false;
    },
  },
  created() {
    this.initMv();
  },
};
</script>

<style lang="scss" scoped>
@include list(25%);
</style>
