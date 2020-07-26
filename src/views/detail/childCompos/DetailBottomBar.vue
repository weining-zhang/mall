<template>
  <div class="bottom-bar">
    <div class="bar-item bottom-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bottom-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background-color: #fff;
    display: flex;
    text-align: center;

    position: relative;
  }
  .bar-item {
    display: flex;
    flex: 1;
  }
  .bar-item>div {
    flex: 1;
  }
  .bottom-left .text {
    font-size: 13px;
  }
  .bottom-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bottom-left .service {
    background-position: 0 -53px;
  }
  .bottom-left .shop {
    background-position: 0 -98px;
  }
  .bottom-left .collect {
    background-position: 0 1px;
  }
  .bottom-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }
  .bottom-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bottom-right .buy {
    background-color: #f69;
  }
</style>
