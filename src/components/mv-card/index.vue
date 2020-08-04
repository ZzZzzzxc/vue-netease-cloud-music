<template>
  <div class="mv-card">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 600, 320)" />
      <template v-if="count && desc">
        <div class="desc txt">{{ desc }}</div>
        <div class="count txt">{{ count }}</div>
      </template>
      <template v-else>
        <div class="txt">{{ desc || count }}</div>
      </template>
    </div>
    <p>{{ name }}</p>
    <p class="artistName">{{ artistName }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "MvCard",
  props: [`imgUrl`, `desc`, `name`, `count`, `artistName`],
  methods: {
    getImgUrl
  }
};
</script>

<style lang="scss" scoped>
.mv-card {
  font-size: $font-size-sm;
  width: 100%;
  cursor: pointer;
  .img-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    padding-top: 53.3%;
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
  .artistName {
    color: $grey-dark;
  }
}
</style>
