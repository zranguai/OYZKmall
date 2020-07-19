<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll">
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info ref="params" :param-info='paramInfo'></detail-param-info>
      <detail-comment-info ref="comment" :comment-info='commentInfo'></detail-comment-info>
      <goods-list ref="recommend" :goods='recommends'/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart='addToCart'/>
    <toast message='购物车添加成功' :show='show'/>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

// import backTopMixin from 'common/mixin'
import {getDetail, Goods, Shop,GoodsParam,getRecommend} from 'network/detail.js';
  
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,
      BackTop,
      Toast
    },
    // mixins: [backTopMixin],
    data(){
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex:0,
        isShowBackTop: false,
        show: false
      }
    },
    created(){
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        // console.log(res);
        // 1.获取顶部的图片轮播数据
        const data = res.result
        // 2.取出轮播图数据
        this.topImages = data.itemInfo.topImages
        // 3.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 4.创建店铺信息
        this.shop = new Shop(data.shopInfo)
        // 5.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 6.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 7.取出评论信息
        if(data.rate.cRate !==0){
          this.commentInfo = data.rate.list[0]
        }

        // 顶部导航点击 但是不包含图片
        // offsetTop值不对 一般都是因为图片问题
        /* this.$nextTick(()=>{
          this.themeTopYs = []

          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);

        }) */
      })
      // 3.请求推荐数据
      getRecommend().then(res=>{
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
          // console.log(this.themeTopYs);
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      backTop() {
        this.$refs.scroll.scrollTo(0,0,300)
      },
      contentScroll(position){
        // 1.获取y值
        const positionY = -position.y
        //顶部导航联动效果
        // 2.positionY和主题值进行对比
        // [0,7938,9120,9452]

        // positionY 在 0到7938之间 index=0
        // positionY 在 7938到9120之间 index=1

        // positionY 在 9120到9452之间 index=2
        let length = this.themeTopYs.length
        // 做法一（普通做法）
        // for(let i=0;i < length;i++){
        //   if(this.currentIndex !== i &&((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i===length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        // 做法二（hack做法）
        for(let i=0;i < length-1;i++){
          if(this.currentIndex !==i && (positionY >= this.themeTopYs[i] &&positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // 3.是否显示回到顶部
        this.isShowBackTop = -position.y > 1000
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 2.将商品添加到购物车
        // console.log('添加成功');
        
        this.$store.commit('addCart',product)
        this.show = true;
        setTimeout(() => {
          this.show = false
        },1500)
      }
    }
  }
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
