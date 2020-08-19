<template>
  <div class="collectors-list-wrap">
    <div class="content">
      <loading :loading="loading">
        <div class="list-wrap wrapper">
          <div
            class="list-item"
            v-for="collector in list"
            :key="collector.userId"
          >
            <collector-card
              :name="collector.nickname"
              :imgUrl="collector.avatarUrl"
            ></collector-card>
          </div>
        </div>
      </loading>
    </div>
    <div class="pagination-wrapper">
      <pagination
        v-model="pagination.currentPage"
        :pagerCount="pagination.pagerCount"
        :limit="pagination.limit"
        :total="total"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { getPlayListSubscribers } from "@/api";
import { Pagination, Loading } from "@/base";
import { CollectorCard } from "@/components";
export default {
  name: "CollectorsList",
  props: ["id", "total"],
  components: { Pagination, CollectorCard, Loading },
  data() {
    return {
      pagination: {
        currentPage: 1,
        pagerCount: 7,
        limit: 60
      },
      list: [],
      loading: false,
      contentEl: document.getElementById("content__ref")
    };
  },
  computed: {
    offset() {
      return (this.pagination.currentPage - 1) * this.pagination.limit;
    }
  },
  watch: {
    offset() {
      if (this.list.length < this.total) this.init();
    }
  },
  methods: {
    async init() {
      this.contentEl &&
        this.contentEl.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth"
        });
      this.loading = true;
      const params = {
        id: this.id,
        offset: this.offset,
        limit: this.pagination.limit
      };
      const { subscribers } = await getPlayListSubscribers(params);
      this.list = subscribers;
      this.loading = false;
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.collectors-list-wrap {
  padding: 24px 0;
  .content {
    padding: 0 64px;
    @include list(20%);
    margin: 24px 0;
  }
  .pagination-wrapper {
    float: right;
  }
}
</style>
