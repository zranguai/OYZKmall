<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物App</div></nav-bar>
  <scroll class="content" 
          ref="scroll" 
          :probe-type='3' 
          @scroll='contentScroll'
          :pull-up-load='true'
          @pullingUp='loadMore'>
    <home-swiper :banners='banners'></home-swiper>
    <recommend-view :Recommends='recommend'></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick='tabClick'></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
// http://152.136.185.210:8000/api/n3/home/data?type=pop&page=1
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home.js' 
  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommend:[],
        goods: {
          'pop': {page:0,list:[]},
          'new': {page:0,list:[]},
          'sell': {page:0,list:[]}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 1.请求多个数据
      getHomeMultidata().then(res=>{
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list; 
      })
      // 2.请求商品数据
      // console.log(this);
      
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      // 事件监听相关代码
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop'
            break
          case 1: 
            this.currentType='new'
            break
          case 2: 
            this.currentType='sell'
            break
        }
      },
      backClick(){
        // console.log('123');
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore(){
        // console.log('123456');
        this.getHomeGoods(this.currentType)
      },


      // 网络请求相关代码
      // getHomeMultidata(){
      //   getHomeMultidata().then(res=>{
      //   console.log(res);
      //   this.banners = res.data.banner.list ;  // 保存结果
      //   this.recommend = res.data.recommend.list 
      //   })
      // },
      getHomeGoods(type){
        const page = this.goods[type].page + 1    // 回看 
        getHomeGoods(type,page).then(res =>
        {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 加载更多
          this.$refs.scroll.finishPullUp()
        })

      },
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
