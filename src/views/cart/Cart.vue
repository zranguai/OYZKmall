<template>
<div class="cart">
  <nav-bar class="nav-bar">
    <div slot="center">
      购物车({{cartLength}})
    </div>
  </nav-bar>

  <cart-list/>
  
  <cart-bottom-bar/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // ...mapGetters(['cartLength','cartList'])
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
      cartLength(){
        return this.$store.state.cartList.length
      }
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
