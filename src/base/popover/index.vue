<template>
  <div class="z-popper-wrapper">
    <transition>
      <div
        ref="popper"
        class="z-popper"
        :class="[popperClass, `z-popper__${placement}`]"
        v-show="showPopper"
      >
        <div class="z-popper-content">
          <slot name="content" />
        </div>
        <div :class="[`z-popper-arrow`, `z-popper-arrow__${placement}`]"></div>
      </div>
    </transition>
    <div class="trigger" ref="trigger">
      <slot />
    </div>
  </div>
</template>

<script>
import { on, off } from "@/utils/dom";
export default {
  name: "Zpopover",
  props: {
    // className
    popperClass: {
      type: String,
      default: ""
    },
    // 触发方式
    trigger: {
      type: String,
      default: "click",
      validator: value => ["click", "hover"].indexOf(value) > -1
    },
    // 出现位置
    placement: {
      type: String,
      default: "bottom",
      validator: value => ["top", "right", "bottom", "left"].indexOf(value) > -1
    },
    // 打开延迟
    openDelay: {
      type: Number,
      default: 0
    },
    // 关闭延迟
    closeDelay: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      showPopper: false
    };
  },
  mounted() {
    this.initObserve();
  },
  methods: {
    initObserve() {
      let { popper, trigger } = this.$refs;
      if (!popper) return;
      this.placementContent();
      switch (this.trigger) {
        case "click": {
          on(trigger, "click", this.doToggle);
          on(document, "click", this.handleDocumentClick);
          break;
        }
        case "hover": {
          on(trigger, "mouseenter", this.handleMouseEnter);
          on(popper, "mouseenter", this.handleMouseEnter);
          on(trigger, "mouseleave", this.handleMouseLeave);
          on(popper, "mouseleave", this.handleMouseLeave);
        }
      }
    },
    placementContent() {
      const { popper, trigger } = this.$refs;
      document.body.appendChild(popper);
      const { width, height, left, top } = trigger.getBoundingClientRect();
      const {
        // height: contentHeight,
        width: contentWidth
      } = popper.getBoundingClientRect();
      const {
        // height: triggerHeight,
        width: triggerWidth
      } = trigger.getBoundingClientRect();
      const map = {
        top: {
          left: window.scrollX + left,
          top: window.scrollY + top
        },
        bottom: {
          left: window.scrollX + left - contentWidth / 2 + triggerWidth / 2,
          top: window.scrollY + height + top
        },
        left: {
          left: window.scrollX + left - contentWidth - triggerWidth / 2,
          top: window.scrollY + top
        },
        right: {
          left: window.scrollX + left + width,
          top: window.scrollY + top
        }
      };
      popper.style.left = `${map[this.placement].left}px`;
      popper.style.top = `${map[this.placement].top}px`;
    },
    doToggle() {
      this.showPopper ? this.doClose() : this.doOpen();
    },
    doOpen() {
      this.showPopper = true;
      this.$nextTick(this.initObserve);
    },
    doClose() {
      this.showPopper = false;
    },
    handleMouseEnter() {
      clearTimeout(this._timer);
      if (this.openDelay) {
        this._timer = setTimeout(() => {
          this.doOpen();
        }, this.openDelay);
      } else {
        this.doOpen();
      }
    },
    handleMouseLeave() {
      clearTimeout(this._timer);
      if (this.closeDelay) {
        this._timer = setTimeout(() => {
          this.doClose();
        }, this.closeDelay);
      } else {
        this.doClose();
      }
    },
    handleDocumentClick(e) {
      let { popper, trigger } = this.$refs;
      if (
        !this.$el ||
        !trigger ||
        this.$el.contains(e.target) ||
        trigger.contains(e.target) ||
        !popper ||
        popper.contains(e.target)
      )
        return;
      this.showPopper = false;
    }
  },
  destroyed() {
    const { trigger, popper } = this.$refs;
    switch (this.trigger) {
      case "click": {
        off(trigger, "click", this.doToggle);
        off(document, "click", this.handleDocumentClick);
        break;
      }
      case "hover": {
        off(trigger, "mouseenter", this.handleMouseEnter);
        off(popper, "mouseenter", this.handleMouseEnter);
        off(trigger, "mouseleave", this.handleMouseLeave);
        off(popper, "mouseleave", this.handleMouseLeave);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.z-popper-wrapper {
  position: relative;
  display: inline-block;
  .trigger {
    display: inline-block;
    cursor: pointer;
  }
}
.z-popper {
  z-index: $popper-index;
  position: absolute;
  min-width: $popper-min-width;
  border-radius: 4px;
  background-color: $white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid $grey;
  padding: 18px 0;
  .z-popper-arrow,
  .z-popper-arrow::after {
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom: 0;
    position: absolute;
  }
  .z-popper-arrow {
    border-top-color: $grey;
    &::after {
      content: "";
      border-top-color: $white;
      bottom: 1px;
      margin-left: -8px;
    }
    &__top {
      bottom: -8px;
      transform: translateX(-50%) rotate(180deg);
      left: 50%;
    }
    &__right {
      top: 50%;
      left: -13px;
      transform: translateY(-50%) rotate(90deg);
    }
    &__bottom {
      top: -8px;
      transform: translateX(-50%) rotate(-180deg);
      left: 50%;
    }
    &__left {
      top: 50%;
      right: -13px;
      transform: translateY(-50%) rotate(-90deg);
    }
  }
  &__top {
    margin-bottom: 12px;
  }
  &__right {
    margin-left: 12px;
  }
  &__bottom {
    margin-top: 12px;
  }
  &__left {
    margin-right: 12px;
  }
  ::-webkit-scrollbar {
    background-color: $grey;
    width: 2px;
    height: 4px;
    background-clip: padding-box;
  }

  /*滚动条中间滑动部分*/
  ::-webkit-scrollbar-thumb {
    background-color: $theme-color;
    border-radius: 5px;
  }
}
</style>
