<template>
  <div class="bottom-bar">
    <div class="check-area">
      <CheckButton :is-checked="isSelectAll" 
                    class="check-button"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计:￥{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList
          .filter(item => item.checked)
          .reduce((acc, cur) => acc + cur.realPrice * cur.count, 0)
          .toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() { // 当所有选项被勾选时，底部全选按钮激活
        if (this.$store.state.cartList.length === 0) return false;
        return this.$store.state.cartList.every(item => item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //当前为全部选中，一键取消全选
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else { //当前为部分选中或全部没选，一键全选
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.checkLength) {
          // this.$toast.show('请选择购买的商品', 2000)
          this.$emit('calcClick')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;
    bottom: 4px;

    background-color: #eee;

    font-size: 14px;
  }

  .check-area {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 10px;
    
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
