<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar
    },
    data(){
      return {
        iid: null
      }
    },
    created(){
      this.iid = this.$route.params.iid
      console.log(this.iid);

    }
  }
</script>
<style scoped>

</style>