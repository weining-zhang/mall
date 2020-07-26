import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前cartList数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
  
      // 2.判断oldProduct
      if (oldProduct) { //已存在购物车的该商品数量+1
        // oldProduct.count ++;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else { //添加新的商品到购物车
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}