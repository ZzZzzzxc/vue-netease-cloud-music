<template>
  <div class="playlist-card" @click="toDetail">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 300, 300)" />
      <div class="desc txt">{{ desc }}</div>
      <div class="count txt">{{ count }}</div>
      <div class="play" @click.stop="handlePlay">
        <img :src="require(`@/assets/icon/play-dark.png`)" />
      </div>
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "PlaylistCard",
  props: [`imgUrl`, `desc`, `name`, `count`, `id`],
  methods: {
    getImgUrl,
    toDetail() {
      this.$router.push({ name: "SongListDetail", params: { id: this.id } });
    },
    handlePlay() {
      this.$emit("click");
    }
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
    .play {
      opacity: 0;
      position: absolute;
      width: 32px;
      height: 32px;
      bottom: 6%;
      right: 6%;
      transition: 0.3s;
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
      .play {
        opacity: 0.8;
      }
    }
  }
}
</style>
