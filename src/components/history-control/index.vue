<template>
  <div class="history-control">
    <div class="item" @click="back">
      <img :src="require(`@/assets/icon/arrow-left-bold.png`)" />
    </div>
    <div class="item" @click="forward">
      <img :src="require(`@/assets/icon/arrow-right-bold.png`)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryControl",
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
  },
};
</script>

<style lang="scss" scoped>
.history-control {
  display: flex;
  height: 100%;
  align-items: center;
  .item {
    transition: 0.4s;
    display: flex;
    align-items: center;
    padding: 0 4px;
    cursor: pointer;
    opacity: 0.4;
    img {
      height: 24px;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
