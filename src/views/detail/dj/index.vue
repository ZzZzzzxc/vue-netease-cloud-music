<template>
  <div class="dj-page-wrap">
    <loading :loading="loading">
      <div class="header">
        <div class="img-wrap">
          <img v-lazy="getImgUrl(info.coverUrl, 250, 250)" />
        </div>
        <div class="info-wrap">
          <div class="title-wrap">
            <div class="tag" v-if="!loading">电台</div>
            <h1 class="title" v-if="info.radio">{{ info.radio.name }}</h1>
          </div>
          <div class="user-wrap" v-if="info.dj">
            <img v-lazy="getImgUrl(info.dj.avatarUrl, 40, 40)" />
            <div class="name">{{ info.dj.nickname }}</div>
            <div class="date" v-if="info.radio">
              {{ formatDate(info.radio.createTime) }}创建
            </div>
          </div>
          <div class="tool-wrap"></div>
          <div class="tag-wrap" v-if="info.radio">
            <span class="tag">{{ info.radio.category }}</span>
          </div>
          <p v-for="(txt, idx) in info.radio.desc.split('\n')" :key="idx">
            {{ txt }}
          </p>
        </div>
      </div>
    </loading>
  </div>
</template>

<script>
import { Loading } from "@/base";
import { getDjProgramDetail, getDjProgram } from "@/api";
import { getImgUrl, formatDate } from "@/utils";
export default {
  name: "Singer",
  components: { Loading },
  props: ["id"],
  data() {
    return {
      loading: false,
      info: {}
    };
  },
  methods: {
    getImgUrl,
    formatDate,
    async initDjProgramDetail() {
      this.loading = true;
      const { id } = this;
      const { program } = await getDjProgramDetail({ id });
      this.info = program;
      this.loading = false;
    },
    async initDjProgram() {
      const { id } = this;
      await getDjProgram({ rid: id });
    }
  },
  created() {
    this.initDjProgramDetail();
    this.initDjProgram();
  }
};
</script>

<style lang="scss" scoped>
.dj-page-wrap {
  .header {
    min-height: 200px;
    display: flex;
    justify-content: flex-start;
    padding: 0 34px;
    margin: 48px 0;
    .img-wrap {
      width: 30%;
      height: 250px;
    }
    .info-wrap {
      width: 50%;
      .title-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .tag {
          margin: 4px 0;
          padding: 2px 8px;
          background-color: $theme-color;
          color: $white;
          font-size: $font-size-sm;
          white-space: nowrap;
        }
        .title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 8px;
        }
      }
      .user-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 16px 0;
        img {
          @include circle(40px);
        }
        .name {
          margin: 0 16px 0 6px;
          color: $grey-dark;
        }
        .date {
          font-size: $font-size-sm;
          color: $grey-dark;
        }
      }
      .tag-wrap {
        font-size: $font-size;
        margin: 16px 0;
        .tag {
          padding: 2px 8px;
          border: solid 1px $theme-color;
          color: $theme-color;
          font-size: $font-size-sm;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
