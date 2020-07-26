<template>
  <div class="cart">
    <!-- 导航栏 -->
    <NavBar class="nav-bar">
      <template #center><div>购物车({{length}})</div></template>
    </NavBar>

    <!-- 商品的列表 -->
    <CartList/>

    <!-- 底部汇总 -->
    <CartBottomBar @calcClick="calcClick"/>

    <!-- 点击去结算弹出提示 -->
    <Toast :message="message" :is-show="show"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Toast from 'components/common/toast/Toast'

  import CartList from './childCompos/CartList'
  import CartBottomBar from './childCompos/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
      Toast
    },
    data() {
      return {
        message: '请选择购买的商品',
        show: false
      }
    },
    computed: {
      // mapGetters两种方式(数组、对象)
      // ...mapGetters(['cartLength'])// 'cartLength'为getters里的方法
      ...mapGetters({// 把 `this.length` 映射为 `this.$store.getters.cartLength`
        length: 'cartLength'
      })
    },
    methods: {
      calcClick() {
        this.show = true;
        
        setTimeout(() => {
          this.show = false
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
</style>
