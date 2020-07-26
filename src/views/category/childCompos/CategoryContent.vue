<template>
  <div class="category-content">
      <div class="cate-title">
        <div v-for="(item, index) in this.sideNavList"
             :key="index"
             @click="indexChange(index, item)"
             :class="{active: currentIndex === index}">
          {{item.title}}
        </div>
      </div>
      <div class="cate-content">
        <div v-for="(item, index) in cateContentList" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="">
            <p>{{item.title}}</p>
          </a>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryContent",
    components: {
    },
    props: {
      sideNavList: {
        type: Array,
        default() {
          return []
        }
      },
      cateContentList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      indexChange(index, item) {
        this.currentIndex = index
        this.$emit('indexChange', item)
      }
    }
  }
</script>

<style lang="less" scoped>
  .category-content {
    margin-top: 44px;
    margin-bottom: 54px;
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .cate-title {
      width: 30%;
      // height: calc(100vh + 5px);
      height: 100%;
      text-align: center;
      position: relative;
      float: left;

      background-color: #f7f7f7;

      font-size: 17px;
      line-height: 37px;
      .active {
        background-color: #ffffff;
        border-left: 3px solid var(--color-tint);
      }
    }
    .cate-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 5px 0;
      float:left;
      overflow:auto; 
      
      width: 70%;
      height: 100%;
      div {
        padding: 5px 0;
        img {
          width: 90px;
          height: 90px;
        }
        p {
          text-align: center;
        }
      }
    }
  }
</style>
