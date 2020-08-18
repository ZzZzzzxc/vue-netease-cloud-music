<template>
  <div class="album-card">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 340, 340)" />
      <div class="play" @click.stop="handlePlay">
        <img :src="require(`@/assets/icon/play-dark.png`)" />
      </div>
    </div>
    <p>
      {{ name }}
      <span v-for="(alia, idx) in alias" :key="idx">{{ alia.name }}</span>
    </p>
    <p class="artistName">{{ artistName }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "AlbumCard",
  props: {
    alias: {
      type: Array
    },
    imgUrl: {
      default: "",
      type: String
    },
    name: {
      default: "",
      type: String
    },
    artistName: {
      default: "",
      type: String
    }
  },
  methods: {
    getImgUrl,
    handlePlay() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.album-card {
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
    .play {
      opacity: 0;
      position: absolute;
      width: 32px;
      height: 32px;
      bottom: 6%;
      right: 6%;
      transition: 0.3s;
    }
    &:hover {
      .play {
        opacity: 0.8;
      }
    }
  }
  .artistName {
    margin-top: 4px;
    color: $grey-dark;
  }
}
</style>
