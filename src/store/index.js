import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = { //state直接在index.js里抽，不需要再新建文件
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store