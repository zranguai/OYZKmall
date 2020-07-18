import vue from 'vue'
import vuex from 'vuex'

import getters from './getters'
// 1.安装插件
vue.use(vuex)

// 2.创建Store对象
const store = new vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state,payload) {
      // payload为新添加的商品
      let oldProduct = null;
      for(let item of state.cartList){
        if(item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  getters
});

// 3.导出
export default store