<template>
  <div class="horizontal-card">
    <div class="banner" :style="bannerStyle">
      <slot name="banner">
        <div class="img-wrap">
          <img v-lazy="getImgUrl(imgUrl, 100)" />
          <div class="count">{{ count }}</div>
        </div>
      </slot>
    </div>
    <div class="content">
      <div v-if="title">{{ title }}</div>
      <div v-if="duration">{{ duration }}</div>
      <div v-if="artist">{{ artist }}</div>
    </div>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "HorizontalCard",
  props: {
    imgUrl: String,
    count: String || Number,
    title: String,
    artist: String,
    duration: String,
    minWidth: {
      default: `50%`
    }
  },
  data() {
    return {};
  },
  computed: {
    bannerStyle() {
      const { minWidth } = this;
      return {
        minWidth
      };
    }
  },
  methods: { getImgUrl }
};
</script>

<style lang="scss" scoped>
.horizontal-card {
  display: flex;
  .banner {
    .img-wrap {
      position: relative;
      padding-top: 100%;
      img {
        @include abs-stretch();
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .count {
        color: $white;
        width: 100%;
        line-height: 1.4;
        position: absolute;
        padding: 0 6px;
        top: 0;
        transition: all 0.3s;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
    overflow: hidden;
    div {
      @include text-ellipsis;
      font-size: $font-size-sm;
      color: $grey-dark;
      &:first-child {
        color: $black;
        font-size: $font-size;
        margin-bottom: 4px;
      }
    }
  }
}
</style>
