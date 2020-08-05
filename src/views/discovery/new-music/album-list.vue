<template>
  <div class="album-page-wrap">
    <div class="album-list-wrap" v-for="(val, idx) in data" :key="idx">
      <div v-for="(list, title) in val" :key="title">
        <div class="title-wrap">{{ title }}</div>
        <ul class="list-wrap">
          <li class="list-item" v-for="(item, index) in list" :key="index">
            <AlbumCard v-bind="formatData(item)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;
const WEEK_KEY = "本周新碟";
import { getAlbumList } from "@/api";
import { AlbumCard } from "@/components";
import { flattenDeep, pad } from "@/utils";
export default {
  name: "album",
  components: { AlbumCard },
  props: {
    type: String, // "new" || "hot"
    area: String
  },
  data() {
    return {
      data: [],
      contentRef: null,
      loading: false,
      scrollToBottom: 0,
      month: MONTH,
      year: YEAR
    };
  },
  computed: {
    params() {
      return {
        type: this.type,
        area: this.area,
        month: this.month,
        year: this.year
      };
    }
  },
  watch: {
    type() {
      this.resetStatus();
    },
    params: {
      handler() {
        this.getList();
      },
      deep: true
    },
    scrollToBottom(val) {
      if (val < 500 && !this.loading) {
        this.setDate();
      }
    }
  },
  methods: {
    setDate() {
      if (this.month > 1) {
        this.month--;
      } else {
        this.year--;
        this.month = 12;
      }
    },
    formatData(item) {
      return {
        alias: item.alias,
        imgUrl: item.picUrl,
        name: item.name,
        artistName: item.artists[0].name
      };
    },
    async getList() {
      const { params } = this;
      if (!this.loading) {
        this.loading = true;
        const { monthData, weekData } = await getAlbumList(params);
        // 最新
        if (this.type === "new") {
          if (weekData) {
            const week = {};
            week[WEEK_KEY] = [...flattenDeep(weekData)];
            this.data.push(week);
          }
        } else {
          // 全部
          const month = {};
          month[`${this.year}-${pad(this.month)}`] = [
            ...flattenDeep(monthData)
          ];
          this.data.push(month);
        }
        this.loading = false;
      }
    },
    // 重置
    resetStatus() {
      this.data = [];
      this.month = MONTH;
      this.year = YEAR;
    },
    scrollAction() {
      let scrollTop = this.contentRef.scrollTop;
      let scrollHeight = this.contentRef.scrollHeight;
      let clientHeight = this.contentRef.clientHeight;
      // 滚动条距离底部的距离
      this.scrollToBottom = scrollHeight - scrollTop - clientHeight;
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    this.contentRef = document.getElementById(`content_ref`);
    this.contentRef.addEventListener("scroll", this.scrollAction);
  },
  destroyed() {
    this.contentRef.removeEventListener("scroll", this.scrollAction);
  }
};
</script>

<style lang="scss" scoped>
.album-page-wrap {
  .album-list-wrap {
    position: relative;
    display: flex;
    .title-wrap {
      height: 0;
      width: 0;
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      position: sticky;
      top: 0;
      z-index: 80;
    }
    .list-wrap {
      padding-left: 80px;
    }
    @include list(20%);
  }
}
</style>
