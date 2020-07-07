<template>
  <swiper>
    <swiper-item :key='index' v-for="(item,index) in banners">
      <a :href="item.libk">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type:Array,
      default(){
        return []
    }

    }
  },
  components: {
    Swiper,
    SwiperItem

  }
}
</script>
<style scoped>

</style>