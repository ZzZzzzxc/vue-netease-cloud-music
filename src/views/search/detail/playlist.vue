<template>
  <div class="playlists-wrap">
    <loading :loading="loading">
      <ul class="list">
        <li
          class="item"
          @click="toDetail(playlist.id)"
          v-for="playlist in data"
          :key="playlist.id"
        >
          <div class="base">
            <img
              class="cover"
              v-lazy="getImgUrl(playlist.coverImgUrl, 90, 90)"
            />
            <div class="name">
              <span
                v-html="brightenKeyword(playlist.name, `${keywords}`)"
              ></span>
            </div>
          </div>
          <div class="count">{{ count }}首</div>
          <div class="creator">by {{ playlist.creator.nickname }}</div>
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
import { getImgUrl, brightenKeyword } from "@/utils";
import { Pagination, Loading } from "@/base";
export default {
  name: "",
  props: ["keywords", "type"],
  components: { Pagination, Loading },
  data() {
    return {
      current: 1,
      limit: 30,
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
    brightenKeyword,
    toDetail(id) {
      this.$router.push({ name: "SongListDetail", params: { id } });
    },
    async getData() {
      this.data = [];
      this.loading = true;
      const { keywords, type, offset, limit } = this;
      const {
        result: { playlistCount, playlists }
      } = await getSearchData({
        keywords,
        type,
        offset,
        limit
      });
      this.data = playlists;
      this.count = playlistCount;
      this.$emit("count", playlistCount);
      this.loading = false;
    }
  },
  mounted() {
    this.$nextTick(this.getData);
  }
};
</script>

<style lang="scss" scoped>
.playlists-wrap {
  .list {
    min-height: 300px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      transition: 0.3s;
      cursor: pointer;
      font-size: $font-size-sm;
      .base {
        display: flex;
        align-items: center;
        width: 30%;
        .cover {
          width: 42px;
          height: 42px;
          margin-right: 16px;
        }
      }
      .count {
        color: $grey-dark;
      }
      .creator {
        width: 30%;
        color: $grey-dark;
      }
      &:nth-child(even) {
        background-color: $grey-light;
      }
      &:hover {
        background-color: $grey;
      }
    }
  }
  .pagination-wrap {
    float: right;
    margin: 24px 0;
  }
}
</style>
