<template>
  <div class="mvs-wrapper">
    <card :shadow="`never`">
      <loading :loading="loading">
        <ul class="list-wrap">
          <li class="list-item" v-for="mv in mvs" :key="mv.id">
            <mv-card
              :imgUrl="mv.imgurl"
              :name="mv.name"
              :count="formatNumber(mv.playCount).toString()"
            ></mv-card>
          </li></ul
      ></loading>
    </card>
  </div>
</template>

<script>
import { getArtistMv } from "@/api";
import { Card, Loading } from "@/base";
import { MvCard } from "@/components";
import { formatNumber } from "@/utils";
export default {
  name: "SingerMvs",
  components: { MvCard, Card, Loading },
  props: ["id"],
  data() {
    return {
      mvs: [],
      loading: false
    };
  },
  methods: {
    formatNumber,
    async initMv() {
      this.loading = true;
      const id = this.id;
      const { mvs } = await getArtistMv({ id, limit: 1000 });
      this.mvs = mvs;
      this.loading = false;
    }
  },
  created() {
    this.initMv();
  }
};
</script>

<style lang="scss" scoped>
.mvs-wrapper {
  @include list(25%);
}
</style>
