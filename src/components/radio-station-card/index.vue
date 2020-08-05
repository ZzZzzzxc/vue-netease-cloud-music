<template>
  <div class="radio-station-card" @click="toDetail">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 170, 170)" />
      <div class="img-wrap__bottom">{{ title }}</div>
    </div>
    <p>{{ footer }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "RadioStationCard",
  props: [`id`, `imgUrl`, `title`, `footer`],
  methods: {
    getImgUrl,
    toDetail() {
      this.$router.push({ name: "Dj", params: { id: this.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-station-card {
  font-size: $font-size-sm;
  width: 100%;
  cursor: pointer;
  .img-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    padding-top: 100%;
    margin-bottom: 8px;
    img {
      @include abs-stretch;
      width: 100%;
      height: 100%;
    }
    &__bottom {
      color: $white;
      width: 100%;
      line-height: 1.8;
      @include text-ellipsis;
      padding: 0 6px;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
