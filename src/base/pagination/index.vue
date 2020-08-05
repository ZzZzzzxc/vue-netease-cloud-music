<template>
  <div v-if="totalPage" class="z-pagination">
    <div @click="prev" class="btn">
      <img
        class="icon"
        :src="require(`@/assets/icon/arrow-left-bold-dark.png`)"
      />
    </div>
    <ul class="list">
      <li
        class="item"
        :class="[1 === currentPage ? `active` : ``]"
        v-if="totalPage > 0"
        @click="onPagerClick(1)"
      >
        1
      </li>
      <li class="item" v-if="showPrevMore">...</li>
      <li
        class="item"
        :class="[page === currentPage ? `active` : ``]"
        v-for="page in pagers"
        :key="page"
        @click="onPagerClick(page)"
      >
        {{ page }}
      </li>
      <li class="item" v-if="showNextMore">...</li>
      <li
        class="item"
        :class="[totalPage === currentPage ? `active` : ``]"
        v-if="totalPage > 1"
        @click="onPagerClick(totalPage)"
      >
        {{ totalPage }}
      </li>
    </ul>
    <div @click="next" class="btn">
      <img
        class="icon"
        :src="require(`@/assets/icon/arrow-right-bold-dark.png`)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ZPagination",
  model: {
    prop: "currentPage",
    event: "pageChange"
  },
  props: {
    currentPage: Number,
    limit: Number,
    total: Number,
    pagerCount: {
      default: 7,
      type: Number
    }
  },
  data() {
    return {
      pagers: [],
      showPrevMore: false,
      showNextMore: false
    };
  },
  watch: {
    currentPage() {
      this.initPagers();
    },
    totalPage() {
      this.initPagers();
    }
  },
  computed: {
    canNext() {
      return this.currentPage !== this.totalPage;
    },
    canPrev() {
      return this.currentPage !== 1;
    },
    totalPage() {
      return Math.ceil(this.total / this.limit);
    }
  },
  methods: {
    prev() {
      if (this.canPrev) {
        this.$emit("pageChange", this.currentPage - 1);
        this.$emit("prev", this.currentPage);
      }
    },
    next() {
      if (this.canNext) {
        this.$emit("pageChange", this.currentPage + 1);
        this.$emit("next", this.currentPage);
      }
    },
    onPagerClick(page) {
      this.$emit("pageChange", page);
    },
    initPagers() {
      const pagerCount = this.pagerCount; // 默认为 7
      const halfPagerCount = (pagerCount - 1) / 2; // 3
      const currentPage = this.currentPage;
      const totalPage = this.totalPage;
      const array = [];
      let showPrevMore = false;
      let showNextMore = false;

      // 总页数大于需要显示的按钮数
      if (totalPage > pagerCount) {
        // 5
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }
        // 96
        if (currentPage < totalPage - halfPagerCount) {
          showNextMore = true;
        }
      }

      if (showPrevMore && !showNextMore) {
        const startPage = totalPage - (pagerCount - 2);
        for (let i = startPage; i < totalPage; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < totalPage; i++) {
          array.push(i);
        }
      }
      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      this.pagers = array;
    }
  },
  mounted() {
    this.initPagers();
  }
};
</script>

<style lang="scss" scoped>
.z-pagination {
  user-select: none;
  display: flex;
  width: 100%;
  .list {
    display: flex;
    .item {
      margin: 0 8px;
      cursor: pointer;
      &:hover {
        color: $theme-color;
      }
    }
    .active {
      color: $theme-color;
    }
  }
  .btn {
    cursor: pointer;
    .icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
