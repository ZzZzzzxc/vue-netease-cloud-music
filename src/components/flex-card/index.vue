<template>
  <div class="flex-card">
    <div class="header" v-if="title">{{ title }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "FlexCard",
  props: {
    title: String
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.flex-card {
  .header {
    height: 54px;
    line-height: 54px;
    font-size: $font-size-lg;
    border-bottom: 1px solid $grey;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
