<template>
  <div class="private-content-card">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 600, 340)" />
      <div class="img-wrap__bottom">{{ title }}</div>
    </div>
    <p>{{ footer }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "RadioStationCard",
  props: {
    imgUrl: {
      default: "",
      type: String
    },
    title: {
      default: "",
      type: String
    },
    footer: {
      default: "",
      type: String
    }
  },
  methods: {
    getImgUrl
  }
};
</script>

<style lang="scss" scoped>
.private-content-card {
  font-size: $font-size-sm;
  width: 100%;
  cursor: pointer;
  .img-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    padding-top: 56.7%;
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
