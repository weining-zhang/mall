import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
  // mutations中的每个方法尽可能完成的事件比较单一一点，把判断逻辑放在actions
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = false
    state.cartList.push(payload)
  },
  checkClick(state, payload) {
    state.cartList[payload].checked = !state.cartList[payload].checked
  }
}