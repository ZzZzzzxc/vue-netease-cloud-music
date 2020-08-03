<template>
  <div class="albums-wrapper">
    <Card :shadow="`hover`">
      <div class="card-content">
        <div class="wrapper" v-for="alb in albums" :key="alb.id">
          <AlbumCard
            :width="120"
            :height="120"
            :img="alb.picUrl"
            :name="alb.name"
            :time="timestampToTime(alb.publishTime)"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { Card } from "@/base";
import { AlbumCard } from "@/components";
import { timestampToTime } from "@/utils";
export default {
  name: "SingerAlbums",
  components: { AlbumCard, Card },
  props: ["albums"],
  methods: {
    timestampToTime,
  },
};
</script>

<style lang="scss" scoped>
.albums-wrapper {
  .card-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .wrapper {
      margin: 12px 16px;
    }
  }
}
</style>
