<template>
  <div class="singer-card" @click="toDetail">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 170, 170)" />
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "SingerCard",
  props: [`imgUrl`, `name`, `id`],
  methods: {
    getImgUrl,
    toDetail() {
      this.$router.push({ name: "Singer", params: { id: this.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.singer-card {
  font-size: $font-size-sm;
  width: 100%;
  cursor: pointer;
  .img-wrap {
    position: relative;
    overflow: hidden;
    border: solid 1px $grey-dark;
    padding-top: 100%;
    margin-bottom: 8px;
    img {
      @include abs-stretch;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
