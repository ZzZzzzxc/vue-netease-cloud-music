<template>
  <div class="mv-list-wrap">
    <loading :loading="loading">
      <ul class="list-wrap">
        <li
          class="list-item"
          v-for="mv in data"
          :key="mv.id"
          @click="toDetail(mv.id)"
        >
          <mv-card
            :imgUrl="mv.cover"
            :name="mv.name"
            :count="formatNumber(mv.playCount).toString()"
            :duration="formatTime(mv.duration / 1000)"
            :artistName="getArtistisText(mv.artists)"
          ></mv-card>
        </li>
      </ul>
    </loading>
    <div class="pagination-wrap">
      <pagination v-model="current" :limit="limit" :total="count"></pagination>
    </div>
  </div>
</template>

<script>
import { getSearchData } from "@/api";
import { getImgUrl, formatNumber, formatTime, getArtistisText } from "@/utils";
import { Pagination, Loading } from "@/base";
import { MvCard } from "@/components";
export default {
  name: "",
  props: ["keywords", "type"],
  components: { Pagination, Loading, MvCard },
  data() {
    return {
      current: 1,
      limit: 20,
      data: [],
      count: 0,
      loading: false
    };
  },
  computed: {
    offset() {
      return this.limit * (this.current - 1);
    }
  },
  watch: {
    current() {
      this.getData();
    },
    keywords() {
      this.current = 1;
      this.getData();
    }
  },
  methods: {
    getImgUrl,
    formatNumber,
    formatTime,
    getArtistisText,
    toDetail(id) {
      this.$router.push({ name: "Mv", params: { id } });
    },
    async getData() {
      this.data = [];
      this.loading = true;
      const { keywords, type, offset, limit } = this;
      const {
        result: { mvCount, mvs }
      } = await getSearchData({
        keywords,
        type,
        offset,
        limit
      });
      this.data = mvs;
      this.count = mvCount;
      this.$emit("count", mvCount);
      this.loading = false;
    }
  },
  mounted() {
    this.$nextTick(this.getData);
  }
};
</script>

<style lang="scss" scoped>
.mv-list-wrap {
  @include list(25%);
  .pagination-wrap {
    float: right;
    margin: 24px 0;
  }
}
</style>
