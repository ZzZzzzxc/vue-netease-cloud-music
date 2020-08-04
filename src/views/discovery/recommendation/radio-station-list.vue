<template>
  <ul class="list-wrap">
    <li class="list-item" v-for="program in djProgram" :key="program.id">
      <RadioStationCard
        :imgUrl="program.picUrl"
        :title="program.copywriter"
        :footer="program.name"
      />
    </li>
  </ul>
</template>

<script>
import { getPersonalDjProgram } from "@/api";
import { RadioStationCard } from "@/components";
export default {
  name: "RadioStationList",
  components: {
    RadioStationCard
  },
  data() {
    return {
      djProgram: []
    };
  },
  methods: {
    async initDjProgram() {
      const { result } = await getPersonalDjProgram();
      this.djProgram = result;
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
