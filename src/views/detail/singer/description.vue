<template>
  <div class="desc-wrapper">
    <div class="section">
      <h2 class="title">{{ name }}简介</h2>
      <div class="content">
        {{ briefDesc }}
      </div>
    </div>
    <div class="section" v-for="intro in introduction" :key="intro.ti">
      <h2 class="title">{{ intro.ti }}</h2>
      <div class="content">
        <p v-for="txt in intro.txt.split('\n')" :key="txt">{{ txt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingerDesc",
  props: {
    name: String,
    briefDesc: String,
    introduction: Array,
    topicData: Array,
  },
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
