<template>
  <div class="collector-card">
    <div class="img-wrap">
      <img v-lazy="getImgUrl(imgUrl, 72, 72)" />
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
import { getImgUrl } from "@/utils";
export default {
  name: "CollectorCard",
  props: ["name", "imgUrl"],
  data() {
    return {};
  },
  mounted() {},
  methods: { getImgUrl },
  computed: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.collector-card {
  text-align: center;
  .img-wrap {
    margin-bottom: 8px;
    img {
      @include circle(70px);
    }
  }
}
</style>
