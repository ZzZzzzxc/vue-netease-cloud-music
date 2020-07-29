<template>
  <div>rank</div>
</template>

<script>
import { getTopList, getArtistTopList } from "@/api";
export default {
  name: "Rank",
  data() {
    return {};
  },
  created() {
    getTopList();
    getArtistTopList({ type: 4 });
  },
};
</script>

<style lang="scss" scoped></style>
