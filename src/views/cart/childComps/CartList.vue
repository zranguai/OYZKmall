<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <ul>
        <li>1231</li>
        <li>1232</li>
        <li>1233</li>
        <li>1234</li>
        <li>1235</li>
        <li>1236</li>
        <li>1237</li>
        <li>1238</li>
        <li>1239</li>
        <li>12310</li>
        <li>12311</li>
        <li>12312</li>
        <li>12313</li>
        <li>12314</li>
        <li>12315</li>
        <li>12316</li>
        <li>12317</li>
        <li>12318</li>
        <li>12319</li>
        <li>12320</li>
        <li>12321</li>
        <li>12322</li>
        <li>12323</li>
        <li>12324</li>
        <li>12325</li>
        <li>12326</li>
        <li>12327</li>
        <li>12328</li>
        <li>12329</li>
        <li>12330</li>
        <li>12331</li>
        <li>12332</li>
        <li>12333</li>
        <li>12334</li>
        <li>12335</li>
        <li>12336</li>
        <li>12337</li>
        <li>12338</li>
        <li>12339</li>
        <li>12340</li>
      </ul>
      <cart-list-item :key="index" v-for="(item,index) in cartList" :product="item"></cart-list-item>
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
    console.log('----');
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
  .cart-list {
    height: 100vh;
  } 
   .content {
    height: calc(100%-44px - 49px);
    overflow: hidden;
  }
</style>