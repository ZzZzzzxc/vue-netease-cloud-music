<template>
  <ul class="list-wrap">
    <li class="list-item" v-for="mv in mvs" :key="mv.id">
      <MvCard
        :imgUrl="mv.picUrl"
        :count="formatNumber(mv.playCount).toString()"
        :desc="mv.copywriter"
        :name="mv.name"
        :artistName="mv.artistName"
      />
    </li>
  </ul>
</template>

<script>
import { getPersonalMv } from "@/api";
import { MvCard } from "@/components";
import { formatNumber } from "@/utils";
export default {
  name: "MvList",
  components: {
    MvCard
  },
  data() {
    return {
      mvs: []
    };
  },
  methods: {
    formatNumber,
    async initMv() {
      const { result } = await getPersonalMv();
      this.mvs = result;
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
