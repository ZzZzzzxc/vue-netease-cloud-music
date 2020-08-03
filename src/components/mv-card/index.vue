<template>
  <div class="mv-card" :style="{ width: `${width}px` }">
    <div
      class="content"
      :style="{ height: `${height}px` }"
      @mouseenter="showCount"
      @mouseleave="hideCount"
    >
      <div class="img" v-lazy:background-image="imgUrl"></div>
      <div class="title txt" :class="!show ? `txt__show` : `txt__hide`">
        {{ title }}
      </div>
      <div class="count txt" :class="show ? `txt__show` : `txt__hide`">
        {{ count }}
      </div>
    </div>
    <div class="footer">{{ footer }}</div>
  </div>
</template>

<script>
export default {
  name: "MvCard",
  props: {
    height: {
      default: 167,
      type: Number
    },
    width: {
      default: 310,
      type: Number
    },
    imgUrl: {
      default: "",
      type: String
    },
    count: {
      type: String
    },
    title: {
      default: "",
      type: String
    },
    footer: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    hideCount() {
      if (this.count) {
        this.show = false;
      }
    },
    showCount() {
      if (this.count) {
        this.show = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mv-card {
  font-size: $font-size-sm;
  .content {
    position: relative;
    overflow: hidden;
    margin-bottom: 12px;
    border-radius: 8px;
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .txt {
      transition: 0.3s;
      color: $white;
      width: 100%;
      @include text-ellipsis();
      padding: 0 6px;
      position: absolute;
      background-color: rgba($color: #000000, $alpha: 0.4);
      &__show {
        top: 0;
      }
      &__hide {
        top: -40px;
      }
    }
    .title {
      font-size: $font-size-lg;
      line-height: 2.1;
    }
    .count {
      text-align: right;
      font-size: $font-size;
      line-height: 1.8;
    }
  }
  .footer {
    width: 100%;
  }
}
</style>
