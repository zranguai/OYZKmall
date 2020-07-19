import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
// 解决移动端300ms延迟
import FastClick from 'fastclick'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
