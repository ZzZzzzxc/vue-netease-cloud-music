<template>
  <div class="z-card" :class="`is-${shadow}-shadow`" :style="wrapStyle">
    <div
      class="z-card__header"
      :style="headerStyle"
      v-if="$slots.header || header"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="z-card__content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZCard",
  props: {
    header: String,
    shadow: {
      type: String,
      default: "hover",
      validator: value => ["always", "never", "hover"].indexOf(value) > -1,
    },
    wrapStyle: {
      default: () => {
        return {};
      },
      type: Object,
    },
    headerStyle: {
      default: () => {
        return {};
      },
      type: Object,
    },
    contentStyle: {
      default: () => {
        return {};
      },
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.z-card {
  transition: 0.3s;
  &__header {
    padding: 18px 20px;
    border-bottom: 1px solid $grey;
  }
  &__content {
    padding: 20px;
  }
}
.is-never-shadow {
  box-shadow: none;
}
.is-always-shadow {
  @include box-shadow;
}
.is-hover-shadow {
  &:hover {
    @include box-shadow;
  }
}
</style>
