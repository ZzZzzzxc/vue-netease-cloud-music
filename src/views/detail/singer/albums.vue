<template>
  <div class="albums-wrapper">
    <Card :shadow="`never`">
      <ul class="list-wrap">
        <li class="list-item" v-for="alb in albums" :key="alb.id">
          <AlbumCard
            :imgUrl="alb.picUrl"
            :name="alb.name"
            :artistName="timestampToTime(alb.publishTime)"
          />
        </li>
      </ul>
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
    timestampToTime
  }
};
</script>

<style lang="scss" scoped>
.albums-wrapper {
  @include list(14.2%);
}
</style>
