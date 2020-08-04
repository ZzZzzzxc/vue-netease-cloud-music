<template>
  <ul class="list-wrap">
    <li class="list-item" v-for="content in privatecontent" :key="content.id">
      <PrivateContentCard :imgUrl="content.picUrl" :footer="content.name" />
    </li>
  </ul>
</template>

<script>
import { getPersonalPrivatecontent } from "@/api";
import { PrivateContentCard } from "@/components";
export default {
  name: "PrivateContentList",
  components: {
    PrivateContentCard
  },
  data() {
    return {
      privatecontent: []
    };
  },
  methods: {
    async initPrivatecontent() {
      const { result } = await getPersonalPrivatecontent();
      this.privatecontent = result;
    }
  },
  created() {
    this.initPrivatecontent();
  }
};
</script>

<style lang="scss" scoped>
@include list(33.3%);
</style>
