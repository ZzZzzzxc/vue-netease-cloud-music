<template>
  <loading :loading="loading">
    <div class="desc-wrapper">
      <div class="section">
        <h2 class="title">{{ name }}简介</h2>
        <div class="content">
          {{ desc.briefDesc }}
        </div>
      </div>
      <div class="section" v-for="(intro, idx) in desc.introduction" :key="idx">
        <h2 class="title">{{ intro.ti }}</h2>
        <div class="content">
          <p v-for="txt in intro.txt.split('\n')" :key="txt">{{ txt }}</p>
        </div>
      </div>
    </div></loading
  >
</template>

<script>
import { getArtistDesc } from "@/api";
import { Loading } from "@/base";
export default {
  name: "SingerDesc",
  props: {
    name: String,
    id: String
  },
  components: { Loading },
  data() {
    return {
      desc: {},
      loading: false
    };
  },
  methods: {
    async initDesc() {
      this.loading = true;
      const { id } = this;
      this.desc = await getArtistDesc({ id });
      this.loading = false;
    }
  },
  created() {
    this.initDesc();
  }
};
</script>

<style lang="scss" scoped>
.desc-wrapper {
  padding: 0 56px;
  .section {
    margin: 20px 0;
    .title {
      margin: 10px 0;
    }
    .content {
      text-indent: 2em;
      color: $grey-dark;
      line-height: 1.6;
    }
  }
}
</style>
