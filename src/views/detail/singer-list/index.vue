<template>
  <div class="singer-list-wrap">
    <div class="header">
      <h1 class="title">云音乐歌手榜</h1>
      <div class="time" v-if="updateTime">
        更新时间：{{ formatDate(updateTime) }}
      </div>
    </div>
    <div class="tabs-wrap">
      <Tabs v-model="activeName" :center="false" :activeColor="`#909399`">
        <TabsPane
          :label="tab.label"
          :name="tab.name"
          v-for="tab in TabsData"
          :key="tab.name"
        >
          <Loading :loading="loading">
            <ul class="list">
              <li
                class="item"
                v-for="(artist, idx) in artists[activeName]"
                :key="artist.id"
                @click="toDetail(artist.id)"
              >
                <div class="idx-wrap">
                  <div class="idx">{{ idx + 1 }}</div>
                  <div class="last-rank">
                    {{ getRankText(idx, artist.lastRank) }}
                  </div>
                </div>
                <div class="img-wrap">
                  <img v-lazy="getImgUrl(artist.picUrl, 64)" />
                </div>
                <div class="name">{{ artist.name }}</div>
                <div class="alias" v-if="artist.alias.length">
                  ({{ getAliasText(artist.alias) }})
                </div>
              </li>
            </ul>
          </Loading>
        </TabsPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
const TabsData = [
  {
    label: "华语",
    name: "1"
  },
  {
    label: "欧美",
    name: "2"
  },
  {
    label: "韩国",
    name: "3"
  },
  {
    label: "日本",
    name: "4"
  }
];
import { getArtistTopList } from "@/api";
import { formatDate, getImgUrl, isDef } from "@/utils";
import { Tabs, TabsPane, Loading } from "@/base";
export default {
  name: "",
  components: {
    Tabs,
    TabsPane,
    Loading
  },
  data() {
    return {
      TabsData,
      artists: {},
      loading: false,
      activeName: TabsData[0].name,
      updateTime: 0
    };
  },
  watch: {
    activeName() {
      this.getArtistsList();
    }
  },
  methods: {
    getImgUrl,
    formatDate,
    getRankText(rank, lastRank) {
      if (!isDef(lastRank)) {
        return `new`;
      }
      const txt = rank - lastRank;
      if (txt == 0) return `-0`;
      return txt > 0 ? `↑${txt}` : `↓${txt}`;
    },
    getAliasText(alias) {
      return (alias || []).join("、");
    },
    async getArtistsList() {
      const { activeName } = this;
      const { list } = await getArtistTopList({ type: activeName });
      const { artists, updateTime } = list;
      this.artists[activeName] = artists;
      this.updateTime = updateTime;
      this.loading = false;
    },
    toDetail(id) {
      this.$router.push({ name: "SingerDetail", params: { id } });
    }
  },
  created() {
    this.getArtistsList();
  }
};
</script>

<style lang="scss" scoped>
.singer-list-wrap {
  .header {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: 32px;
      margin-bottom: 12px;
    }
    .time {
      color: $grey-dark;
    }
  }
  .list {
    .item {
      transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
      display: flex;
      align-items: center;
      height: 64px;
      cursor: pointer;
      .idx-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        opacity: 0.8;
        margin: 0 32px;
        .idx {
          font-weight: bold;
          font-size: 20px;
        }
        .last-rank {
          font-size: $font-size-sm;
        }
      }
      .img-wrap {
        height: 48px;
        width: 48px;
        position: relative;
        margin: 0 24px;
        img {
          height: 100%;
          width: 100%;
          @include abs-center;
        }
      }
      .name {
      }
      .alias {
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
}
</style>
