<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物App</div></nav-bar>
  <tab-control class="tab-control" 
                   :titles="['流行','新款','精选']" 
                    @tabClick='tabClick'
                    ref="tabControl1"
                    v-show="isTabFixed"></tab-control>
  <scroll class="content" 
          ref="scroll" 
          :probe-type='3' 
          @scroll='contentScroll'
          :pull-up-load='true'
          @pullingUp='loadMore'>
    <home-swiper :banners='banners' @swiperImageLoas='swiperImageLoas'></home-swiper>
    <recommend-view :Recommends='recommend'></recommend-view>
    <feature-view></feature-view>
    <tab-control  
                :titles="['流行','新款','精选']" 
                 @tabClick='tabClick'
                 ref="tabControl2"
                 ></tab-control>
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
import {debounce} from 'common/utils.js'
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
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata()
      // getHomeMultidata().then(res=>{
      //   console.log(res);
      //   this.banners = res.data.banner.list;
      //   this.recommend = res.data.recommend.list; 
      // })
      // 2.请求商品数据
      // console.log(this);
      
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      // 3.监听GoodsListItem中图片加载完成  错误示范，在这里面拿到的对象可能为空
      // this.$bus.$on('itemImageLoad',()=>{
      //   // console.log(this.$refs.scroll);
      //   this.$refs.scroll.refresh()
      // })
    },
    mounted(){
      // 1..监听GoodsListItem中图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
        // this.$refs.scroll&&
      })      
    },
    destroyed() {
      console.log('home destroyed')
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        // console.log('123'); 拿到scroll组件(scroll.vue)里面的scrollTo方法
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoas(){
        // 2.获取tabControl的offsetTop
        // 所有组件都有一个属性$el用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

      },

      // 网络请求相关代码
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
        // console.log(res);
        this.banners = res.data.banner.list ;  // 保存结果
        this.recommend = res.data.recommend.list 
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1    // 回看 
        getHomeGoods(type,page).then(res =>
        {
          this.goods[type].list.push(...res.data.list)   // 把里面的数据一个一个的取出来再放到list下面去
          this.goods[type].page += 1

          // 上拉加载更多
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
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  } */
  /* .content {
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
