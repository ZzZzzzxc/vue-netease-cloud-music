<template>
  <div class="">没做</div>
</template>

<script>
import { getVideoTagList, getVideoCategoryList, getAllVideo } from "@/api";
export default {
  name: "VideoList",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async initTagList() {
      await getVideoTagList();
    },
    async initCategoryList() {
      await getVideoCategoryList();
    },
    async getAllVideoList() {
      await getAllVideo();
    }
  },
  created() {
    this.initTagList();
    this.initCategoryList();
    this.getAllVideoList();
  }
};
</script>

<style lang="scss" scoped></style>
