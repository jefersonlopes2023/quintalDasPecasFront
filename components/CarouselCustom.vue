<template>
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-if="banners == 0">
        <Skeleton width="100%" height="100%"></Skeleton>
      </swiper-slide>
      <swiper-slide v-for="(v,k) in banners">
        <img :src="v.file_path">
      </swiper-slide>
    </swiper>
  </template>
<script>
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';  
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {

  props:{
    banners:{
      type: Object,
      default: '',
      required:true
    }
  },
  components: {
  Swiper,
  SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {     
    };
    const onSlideChange = () => {
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],

    };
  },
};
</script>
  