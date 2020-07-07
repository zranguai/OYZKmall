<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <home-swiper :banners='banners'></home-swiper>
  <recommend-view :Recommends='recommend'></recommend-view>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'

import {getHomeMultidata} from 'network/home.js' 
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
      return {
        banners:[],
        recommend:[]
      }
    },
    created(){
      getHomeMultidata().then(res=>{
        // console.log(res);
        this.banners = res.data.banner.list ;  // 保存结果
        this.recommend = res.data.recommend.list 
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
