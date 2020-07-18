<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
  .toast {
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .7);
  }
</style>