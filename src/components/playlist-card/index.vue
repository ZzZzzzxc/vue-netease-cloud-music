<template>
  <div class="playlist-card">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 300, 300)" />
      <div class="desc txt">{{ desc }}</div>
      <div class="count txt">{{ count }}</div>
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "PlaylistCard",
  props: [`imgUrl`, `desc`, `name`, `count`],
  methods: {
    getImgUrl
  }
};
</script>

<style lang="scss" scoped>
.playlist-card {
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
    .txt {
      color: $white;
      width: 100%;
      line-height: 1.4;
      position: absolute;
      padding: 6px;
      top: 0;
      transition: all 0.3s;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .desc {
      transform: translateY(-100%);
    }
    .count {
      transform: translateY(0);
    }
    &:hover {
      .desc {
        transform: translateY(0);
      }
      .count {
        transform: translateY(-100%);
      }
    }
  }
}
</style>
