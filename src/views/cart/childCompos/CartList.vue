<template>
  <div class="cart-list">
    <Scroll class="content">
      <CartListItem v-for="(item, index) in cartList" 
                    :key="index" 
                    :item-info="item"
                    @checkClick="checkClick(index)"/>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    methods: {
      checkClick(index) {
        this.$store.commit('checkClick', index)
      }
    }
  }
</script>

<style scoped>
  /* .cart-list {
    height: 100vh;
  } */
  .content {
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
