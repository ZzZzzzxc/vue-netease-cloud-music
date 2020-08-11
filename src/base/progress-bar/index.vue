<template>
  <div class="progress-bar" @mousedown="handleClick" ref="bar">
    <div class="current" :style="{ width: `${percentage * barWidth}px ` }" />
    <div
      ref="btn"
      class="btn"
      :style="{
        left: btnLeft,
      }"
      @mousedown="onMousedown"
    />
  </div>
</template>

<script>
export default {
  name: "ZProgressBar",
  model: {
    prop: "percentage",
    event: "percentageChange",
  },
  props: ["percentage"],
  data() {
    return {
      btnWidth: 0,
      barWidth: 0,
      startX: 0,
      move: false,
    };
  },
  computed: {
    btnLeft() {
      const { percentage, barWidth, btnWidth } = this;
      const currentLeft = percentage * barWidth;
      const maxLeft = barWidth - btnWidth;
      return `${currentLeft > maxLeft ? maxLeft : currentLeft}px`;
    },
  },
  methods: {
    formatPercentage(percentage) {
      if (percentage < 0) return 0;
      if (percentage > 1) return 1;
      return percentage;
    },
    handleClick(e) {
      // 点击小球时跳过
      if (e.target === this.$refs.btn) {
        return;
      }
      this.$emit(
        "percentageChange",
        this.formatPercentage(e.offsetX / this.barWidth)
      );
    },
    onMousedown(e) {
      this.move = true;
      const btn = this.$refs.btn;
      this.startX = e.clientX - btn.offsetLeft;
      document.addEventListener("mousemove", this.onMousemove);
    },
    onMousemove(e) {
      if (this.move) {
        this.$emit(
          "percentageChange",
          this.formatPercentage((e.clientX - this.startX) / this.barWidth)
        );
      }
    },
  },
  mounted() {
    this.btnWidth = this.$refs.btn.offsetWidth;
    this.barWidth = this.$refs.bar.offsetWidth;
    document.addEventListener("mouseup", () => {
      this.move = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  background-color: $grey;
  height: 4px;
  width: 100%;
  position: relative;
  .current {
    height: inherit;
    background-color: $theme-color;
  }
  .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: $theme-color;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
}
</style>
