<template>
  <div class="profile">
    <NavBar class="nav-bar"><template #center><span>我的信息</span></template></NavBar>
    <div class="info">
      <img src="~assets/img/profile/avatar.svg" alt="">
      <div class="center">
        <p class="login">登录/注册</p>
        <p class="phone"><van-icon name="graphic"/>暂无绑定的手机号</p>
      </div>
      <div class="i">
        <van-icon name="arrow"/>
      </div>
    </div>
    <div class="detail">
      <div class="detail-item surplus">
        <p><span>0.00</span> 元</p>
        <p>我的余额</p>
      </div>
      <div class="detail-item coupon">
        <p><span>0</span></p>
        <p>优惠劵</p>
      </div>
      <div class="detail-item point">
        <p><span>0</span></p>
        <p>我的积分</p>
      </div>
    </div>
    <div class="option-list">
      <div class="option-list-item">
        <img src="~assets/img/profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="option-list-item">
        <img src="~assets/img/profile/pointer.svg" alt="">
        <span>我的商城</span>
      </div>
      <div class="option-list-item" id="option-vip">
        <img src="~assets/img/profile/vip.svg" alt="">
        <span>会员卡</span>
      </div>
      <div class="option-list-item">
        <img src="~assets/img/profile/cart.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div class="option-list-item">
        <img src="~assets/img/profile/shopping.svg" alt="">
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue';

  export default {
    name: "Profile",
    components: {
      NavBar
    },
  };
</script>

<style lang="less" scoped>
  .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
  }
  .info {
    display: flex;
    height: 74px;
    padding: 5px 8px;

    background-color: var(--color-tint);
    color: #fff;
    img {
      width: 64px;
      height: 64px;
    }
    .center {
      line-height: 32px;
      margin-left: 12px;
      
      flex: 1;
      justify-content: center;
    }
    .login {
      font-size: 18px;
    }
    .phone {
      font-size: 14px;
    }
    .i {
      width: 40px;
      text-align: center;
      line-height: 74px;

      font-size: 16px;
    }
  }
  .detail {
    display: flex;
    align-items: center;
    
    height: 80px;
    border-bottom: 5px solid #F2F2F2;
    .detail-item {
      flex: 1;
      text-align: center;

      font-size: 14.6px;
      p {
        padding: 1.5px 0;
        span {
          color: #E67962;
          font-weight: bold;
        }
      }
    }
  }
  .option-list {
    .option-list-item {
      height: 46px;
      line-height: 46px;
      display: flex;
      align-items: center;
      
      border-bottom: 1px solid #f2f2f2;
      margin: 0 14px;

      font-size: 14.6px;
      img {
        margin-right: 8px;
      }
    }
    #option-vip {
      margin: 0;
      padding-left: 14px;
      border-bottom: 5px solid #F2F2F2;
    }
    img {
      width: 26px;
      height: 26px;
    }
  }
</style>
