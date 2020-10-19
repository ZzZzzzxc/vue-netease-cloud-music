<template>
  <div class="user-list-wrap">
    <loading :loading="loading">
      <ul class="user-list">
        <li class="item" v-for="user in data" :key="user.id">
          <div class="base">
            <img class="ava" v-lazy="getImgUrl(user.avatarUrl, 90, 90)" />
            {{ user.nickname }}
            <img
              v-if="user.gender === 1"
              class="gender"
              :src="require(`@/assets/icon/man.png`)"
            />
            <img
              v-else
              class="gender"
              :src="require(`@/assets/icon/woman.png`)"
            />
          </div>
          <div class="signature">{{ user.signature }}</div>
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
import { getImgUrl } from "@/utils";
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
    async getData() {
      this.data = [];
      this.loading = true;
      const { keywords, type, offset, limit } = this;
      const {
        result: { userprofileCount, userprofiles }
      } = await getSearchData({
        keywords,
        type,
        offset,
        limit
      });
      this.data = userprofiles;
      this.count = userprofileCount;
      this.$emit("count", userprofileCount);
      this.loading = false;
    }
  },
  mounted() {
    this.$nextTick(this.getData);
  }
};
</script>

<style lang="scss" scoped>
.user-list-wrap {
  .user-list {
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
        .ava {
          @include circle(42px);
          margin-right: 16px;
        }
        .gender {
          width: 16px;
          height: 16px;
        }
      }
      .signature {
        width: 60%;
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
