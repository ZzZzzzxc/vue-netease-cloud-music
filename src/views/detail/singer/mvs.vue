<template>
  <div class="mvs-wrapper">
    <Card :shadow="`never`">
      <ul class="list-wrap">
        <li class="list-item" v-for="mv in mvs" :key="mv.id">
          <MvCard
            :imgUrl="mv.imgurl"
            :name="mv.name"
            :count="formatNumber(mv.playCount).toString()"
          />
        </li>
      </ul>
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
  methods: { formatNumber }
};
</script>

<style lang="scss" scoped>
.mvs-wrapper {
  @include list(25%);
}
</style>
