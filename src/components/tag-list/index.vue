<template>
  <div class="hot-tags">
    <div class="title " v-if="title">
      {{ title }}
    </div>
    <ul class="list">
      <li
        class="item-wrapper"
        v-for="tag in tags"
        :key="tag.name"
        @click="onTagClick(tag)"
      >
        <span
          class="item"
          :class="[
            active && activeTag && activeTag.name === tag.name ? `active` : ``
          ]"
          >{{ tag.name }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TagList",
  props: {
    tags: Array, // [{name:xxx}]
    title: String,
    active: {
      default: false,
      type: Boolean
    },
    defaultActive: Object
  },
  data() {
    return {
      activeTag: this.defaultActive
    };
  },
  watch: {
    activeTag(tag) {
      this.$emit("tagChange", tag);
    }
  },
  methods: {
    onTagClick(tag) {
      this.activeTag = tag;
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-tags {
  display: flex;
  font-size: $font-size-sm;
  flex-wrap: nowrap;
  margin: 18px 0;
  width: 100%;
  .title {
    min-width: 60px;
    line-height: 24px;
    height: 24px;
  }
  .list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .item-wrapper {
      margin-bottom: 12px;
      padding: 0 12px;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      &:not(:last-child) {
        border-right: 1px $grey solid;
      }
      .active {
        color: $white;
        background-color: $grey-dark;
      }
      .item {
        padding: 6px;
      }
    }
  }
}
</style>
