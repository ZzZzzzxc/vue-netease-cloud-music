<template>
  <loading :loading="loading">
    <ul class="list-wrap">
      <li
        class="list-item"
        v-for="mv in mvs"
        :key="mv.id"
        @click="toDetail(mv.id)"
      >
        <mv-card
          :imgUrl="mv.picUrl"
          :count="formatNumber(mv.playCount).toString()"
          :desc="mv.copywriter"
          :name="mv.name"
          :artistName="mv.artistName"
        ></mv-card>
      </li></ul
  ></loading>
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
    Loading
  },
  data() {
    return {
      mvs: [],
      Loading
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
    toDetail(id) {
      this.$router.push({ name: "Mv", params: { id } });
    }
  },
  created() {
    this.initMv();
  }
};
</script>

<style lang="scss" scoped>
@include list(25%);
</style>
