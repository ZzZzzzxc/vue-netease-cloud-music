<template>
  <div class="card-wrap">
    <card :headerStyle="cardHeaderStyle">
      <template slot="header">
        <div class="card-header">
          <div class="left">
            <div class="title">MV排行榜</div>
            <div class="tag-wrap">
              <tag-list
                :active="true"
                :defaultActive="rankActiveTag"
                :tags="areaTags"
                @tagChange="onRankTagChange"
              ></tag-list>
            </div>
          </div>
          <div class="right">最近更新：{{ formatDate(updateTime) }}</div>
        </div>
      </template>
      <div class="rank">
        <loading :loading="mvRankLoading">
          <ul class="list-wrap">
            <li
              class="list-item"
              v-for="(mv, idx) in mvRank"
              :key="mv.id"
              @click="toDetail(mv.id)"
            >
              <div class="rank-card-wrap">
                <div class="idx">
                  {{ pad(idx + 1) }}
                </div>
                <div class="horizontal-card-wrap">
                  <horizontal-card
                    :title="mv.name"
                    :artist="getArtistisText(mv.artists)"
                  >
                    <template slot="banner">
                      <mv-card
                        :imgUrl="mv.cover"
                        :desc="
                          `播放次数：${formatNumber(mv.playCount).toString()}`
                        "
                        :count="`热度：${mv.score}`"
                      ></mv-card>
                    </template>
                  </horizontal-card>
                </div>
              </div>
            </li>
          </ul>
        </loading>
      </div>
    </card>
  </div>
</template>

<script>
import { getTopMv } from "@/api";
import {
  formatNumber,
  getArtistisText,
  pad,
  hasKey,
  formatDate,
} from "@/utils";
import { Card, Loading } from "@/base";
import { TagList, MvCard, HorizontalCard } from "@/components";
import { areaTags } from "@/config";
export default {
  name: "",
  components: { Card, TagList, MvCard, HorizontalCard, Loading },
  data() {
    const cardHeaderStyle = {
      padding: "6px 16px 0 16px",
    };
    const tags = [{ name: "全部", value: "" }, ...areaTags];
    return {
      cardHeaderStyle,
      areaTags: tags,
      mvRankLoading: false,
      rankActiveTag: tags[0],
      mvRank: [],
      updateTime: 0,
    };
  },
  watch: {
    rankActiveTag() {
      this.mvRank = [];
      this.getMvRank();
    },
  },
  methods: {
    formatNumber,
    getArtistisText,
    pad,
    formatDate,
    getTagValue(tag) {
      return tag[hasKey(tag, "value") ? "value" : "name"];
    },
    onRankTagChange(tag) {
      this.rankActiveTag = tag;
    },
    async getMvRank() {
      this.mvRankLoading = true;
      const { rankActiveTag } = this;
      const { data, updateTime } = await getTopMv({
        limit: 50,
        offset: 0,
        area: this.getTagValue(rankActiveTag),
      });
      this.updateTime = updateTime;
      this.mvRank = data;
      this.mvRankLoading = false;
    },
    toDetail(id) {
      if (id) this.$router.push({ name: "Mv", params: { id } });
    },
  },
  created() {
    this.getMvRank();
  },
};
</script>

<style lang="scss" scoped>
.card-wrap {
  margin: 24px 0;
  @include list(33.3%);
  .list-wrap {
    min-height: 100px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      height: 42px;
      line-height: 42px;
      .title {
        font-size: 21px;
      }
      .tag-wrap {
        display: flex;
        align-items: center;
      }
    }
    .right {
      color: $grey-dark;
      font-size: $font-size-sm;
      cursor: pointer;
    }
  }
  .rank {
    @include list(50%);
    .rank-card-wrap {
      display: flex;
      width: 100%;
      .idx {
        font-size: 32px;
        font-weight: bold;
        color: $grey-dark;
        margin-right: 12px;
        width: 10%;
      }
      .horizontal-card-wrap {
        height: 100%;
        width: 90%;
      }
    }
  }
}
</style>
