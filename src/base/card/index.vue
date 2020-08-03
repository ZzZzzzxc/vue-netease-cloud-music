<template>
  <div class="z-card" :class="`is-${shadow}-shadow`" :style="wrapStyle">
    <div class="z-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="z-card__content" :style="contentStyle">
      <slot />
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.is-hover-shadow {
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
