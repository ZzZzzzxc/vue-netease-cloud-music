<template>
  <div
    class="progress-bar"
    :style="{ height: `${height}px` }"
    @mousedown="handleClick"
    ref="bar"
  >
    <div
      class="current"
      :style="{ width: `${percentage * barWidth}px `, backgroundColor: color }"
    />
    <div
      v-show="!disable"
      ref="btn"
      :style="btnStyle"
      @mousedown="onMousedown"
    />
  </div>
</template>

<script>
import { on, off } from "@/utils/dom";
export default {
  name: "ZProgressBar",
  model: {
    prop: "percentage",
    event: "percentageChange"
  },
  props: {
    // 是否允许调整进度
    disable: Boolean,
    // v-moel 当前进度 0~1
    percentage: Number,
    // 高度
    height: {
      type: Number,
      default: 4
    },
    // 颜色
    color: {
      type: String,
      default: `#d33a31`
    },
    // 小球大小计算系数
    coefficient: {
      type: Number,
      default: 2
    }
  },

  data() {
    return {
      barWidth: 0,
      startX: 0,
      move: false
    };
  },
  computed: {
    btnStyle() {
      const { btnLeft, color, btnWidth } = this;
      return {
        left: btnLeft,
        position: `absolute`,
        top: ` 50%`,
        transform: ` translateY(-50%)`,
        backgroundColor: color,
        width: `${btnWidth}px`,
        height: `${btnWidth}px`,
        borderRadius: `50%`,
        cursor: `pointer`
      };
    },
    btnWidth() {
      return this.height * this.coefficient;
    },
    btnLeft() {
      const { percentage, barWidth, btnWidth } = this;
      const currentLeft = percentage * barWidth - btnWidth / 2;
      return `${currentLeft}px`;
    }
  },
  methods: {
    formatPercentage(percentage) {
      if (percentage < 0) return 0;
      if (percentage > 1) return 1;
      return percentage;
    },
    handleClick(e) {
      if (this.disable) return;
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
      if (this.disable) return;
      this.move = true;
      const btn = this.$refs.btn;
      this.startX = e.clientX - btn.offsetLeft;
      on(document, "mousemove", this.onMousemove);
    },
    onMousemove(e) {
      if (this.disable) return;
      if (this.move) {
        this.$emit(
          "percentageChange",
          this.formatPercentage((e.clientX - this.startX) / this.barWidth)
        );
      }
    },
    stopMove() {
      this.move = false;
    }
  },
  mounted() {
    this.barWidth = this.$refs.bar.offsetWidth;
    on(document, "mouseup", this.stopMove);
  },
  beforeDestroy() {
    off(document, "mousemove", this.onMousemove);
    off(document, "mouseup", this.stopMove);
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  background-color: $grey;
  width: 100%;
  position: relative;
  cursor: pointer;
  .current {
    height: inherit;
  }
}
</style>
