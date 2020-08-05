<template>
  <div class="song-sheet-card" @click="toDetail">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 300, 300)" />
      <div class="img-wrap__top txt">{{ count }}</div>
      <div class="img-wrap__bottom txt">{{ artistName }}</div>
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "SongSheetCard",
  props: [`imgUrl`, `count`, `name`, `artistName`, `id`],
  methods: {
    getImgUrl,
    toDetail() {
      this.$router.push({ name: "SongList", params: { id: this.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.song-sheet-card {
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
      transition: all 0.3s;
    }
    &__top {
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
    &__bottom {
      bottom: 0;
    }
  }
}
</style>
