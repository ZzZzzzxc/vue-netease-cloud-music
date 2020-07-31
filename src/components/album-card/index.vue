<template>
  <div class="album-card">
    <div class="img" v-lazy:background-image="img"></div>
    <div class="name">
      {{ name }}
      <span class="alias" v-for="(item, idx) in alias" :key="idx">
        [{{ item }}]
      </span>
    </div>
    <div v-if="artist" class="artist">
      {{ artist.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumCard",
  props: {
    alias: Array,
    img: String,
    name: String,
    artist: Object
  }
};
</script>

<style lang="scss" scoped>
.album-card {
  width: 120px;
  font-size: $font-size-sm;
  .img {
    width: 120px;
    height: 120px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .name {
    margin: 6px 0;
    line-height: 1.4;
    @include text-ellipsis-multi(2);
    .alias {
      color: $grey-dark;
    }
  }
  .artist {
    color: $grey-dark;
    @include text-ellipsis();
  }
}
</style>
