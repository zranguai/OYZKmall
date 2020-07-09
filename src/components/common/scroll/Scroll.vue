<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default:0
    },
    pullUpLoad: {
      type: Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll: null,
    }
  },
  mounted(){
    // 1.创建BScroll对象
    // 用document.querrySellctor拿到的不准确
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll',position=>{
      // console.log(position);
      this.$emit('scroll',position)
    })
    // this.scroll.scrollTo(0,0)
    // 3. 监听上拉事件
    this.scroll.on('pullingUp',()=>{
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    // 为了解决加载一次后不再加载问题更多
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>
<style scoped>

</style>