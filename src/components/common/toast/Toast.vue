<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // message: '',
        // isShow: false
      }
    },
    methods: {
      // show(message='商品成功添加到购物车', duration=1000) {
      //   this.isShow = true;
      //   this.message = message;

      //   setTimeout(() => {
      //     this.isShow = false;
      //     this.message = '';
      //   }, duration)
      // }
    }
  }
</script>

<style scoped>
  .toast {
    width: 180px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    text-align: center;
    border-radius: 6px;

    z-index: 999;

    color: #fff;
    background-color:rgba(0, 0, 0, .75);
  }
</style>
