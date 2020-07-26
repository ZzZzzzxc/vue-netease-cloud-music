<template>
  <div>
    <Swiper>
      <SwiperItem v-for="(banner, index) in banners" :key="banner">
        {{ index }}
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/base/index";
import banner1 from "@/assets/img/1.jpg";
import banner2 from "@/assets/img/2.jpg";
import banner3 from "@/assets/img/3.jpg";
import banner4 from "@/assets/img/4.jpg";
import banner5 from "@/assets/img/5.jpg";
import banner6 from "@/assets/img/6.jpg";
import banner7 from "@/assets/img/7.jpg";
export default {
  name: "Recommend",
  data() {
    return {
      banners: [banner1, banner2, banner3, banner4, banner5, banner6, banner7],
    };
  },
  components: { Swiper, SwiperItem },
};
</script>

<style lang="scss" scoped></style>
