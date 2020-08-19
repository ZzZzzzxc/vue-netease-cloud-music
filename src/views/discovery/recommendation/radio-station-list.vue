<template>
  <loading :loading="loading">
    <ul class="list-wrap">
      <li class="list-item" v-for="program in djProgram" :key="program.id">
        <radio-station-card
          :imgUrl="program.picUrl"
          :title="program.copywriter"
          :footer="program.name"
          :id="program.id"
        ></radio-station-card>
      </li>
    </ul>
  </loading>
</template>

<script>
import { getPersonalDjProgram } from "@/api";
import { RadioStationCard } from "@/components";
import { Loading } from "@/base";
export default {
  name: "RadioStationList",
  components: {
    RadioStationCard,
    Loading
  },
  data() {
    return {
      loading: false,
      djProgram: []
    };
  },
  methods: {
    async initDjProgram() {
      this.loading = true;
      const { result } = await getPersonalDjProgram();
      this.djProgram = result;
      this.loading = false;
    }
  },
  created() {
    this.initDjProgram();
  }
};
</script>

<style lang="scss" scoped>
@include list(16.6%);
</style>
