<template>
  <div class="z-card" :style="customStyle">
    <div class="z-card__header">
      <div class="title">{{ title }}</div>
      <div v-if="triggerLabel" class="trigger" @click="triggerCallback">
        {{ triggerLabel }}>
      </div>
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
    flex: {
      default: true,
      type: Boolean
    },
    flexWrap: {
      default: false,
      type: Boolean
    },
    customStyle: {
      default: () => {
        return {};
      },
      type: Object
    },
    title: {
      default: "",
      type: String
    },
    triggerLabel: {
      default: "",
      type: String
    },
    triggerCallback: {
      default: () => {},
      type: Function
    }
  },
  data() {
    return {};
  },
  computed: {
    contentStyle() {
      return this.flex
        ? {
            display: "flex",
            justifyContent: "space-between",
            "flex-wrap": this.flexWrap ? "wrap" : "nowrap"
          }
        : {};
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.z-card {
  &__header {
    display: flex;
    justify-content: space-between;
    border-bottom: $grey 1px solid;
    height: $card-header-height;
    .title {
      font-size: 20px;
    }
    .trigger {
      padding-top: 16px;
      cursor: pointer;
      color: $grey-dark;
    }
  }
  &__content {
    margin-top: 16px;
  }
}
</style>
