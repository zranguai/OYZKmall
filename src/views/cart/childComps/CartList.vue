<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item :key="index" v-for="(item,index) in cartList" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed : {
    cartList(){
      return this.$store.state.cartList
    }
  },
  activated() {
    // console.log('----');
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  } 
   .content {
     height: 100%;
    overflow: hidden;
  }
</style>