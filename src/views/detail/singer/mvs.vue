<template>
  <div class="mvs-wrapper">
    <Card :shadow="`hover`">
      <div class="card-content">
        <div class="wrapper" v-for="mv in mvs" :key="mv.id">
          <MvCard
            :width="240"
            :height="120"
            :imgUrl="mv.imgurl"
            :footer="mv.name"
            :count="formatNumber(mv.playCount).toString()"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { Card } from "@/base";
import { MvCard } from "@/components";
import { formatNumber } from "@/utils";
export default {
  name: "SingerMvs",
  components: { MvCard, Card },
  props: ["mvs"],
  methods: { formatNumber },
};
</script>

<style lang="scss" scoped>
.mvs-wrapper {
  .card-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .wrapper {
      margin: 12px 16px;
    }
  }
}
</style>
