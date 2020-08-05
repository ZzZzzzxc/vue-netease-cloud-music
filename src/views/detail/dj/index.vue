<template>
  <div class="dj-page-wrap">{{ id }}</div>
</template>

<script>
import { getDjProgramDetail } from "@/api";
import { getImgUrl } from "@/utils";
export default {
  name: "Singer",
  components: {},
  props: ["id"],
  data() {
    return {
      info: {}
    };
  },
  methods: {
    getImgUrl,
    async initDjProgramDetail() {
      const id = this.id;
      await getDjProgramDetail({ id });
    }
  },
  created() {
    this.initDjProgramDetail();
  }
};
</script>

<style lang="scss" scoped></style>
