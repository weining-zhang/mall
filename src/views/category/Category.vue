<template>
  <div class="category">
    <NavBar class="nav-bar">
      <template #center><span>商品分类</span></template>
    </NavBar>
    <CategoryContent :sideNavList="sideNavList"
                     :cateContentList="cateContentList"
                     @indexChange="indexChange"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  import CategoryContent from './childCompos/CategoryContent.vue'
  
  import { getCategory, getSubCategory } from 'network/category'

  export default {
    name: "Category",
    components:{
      NavBar,
      CategoryContent
    },
    data() {
      return {
        sideNavList: [],
        cateContentList: [],
        maitkey: 3627
      }
    },
    created() {
      getCategory().then(res => {
        // console.log(res);
        this.sideNavList = res.data.category.list
      }),
      getSubCategory(this.maitkey).then(res => {
        // console.log(res);
        this.cateContentList = res.data.list;
      })
    },
    methods: {
      indexChange(item) {
        this.maitkey = item.maitKey
        // console.log(this.maitkey);
        getSubCategory(this.maitkey).then(res => {
          // console.log(res);
          this.cateContentList = res.data.list;
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .category {
    height: 100vh;
    .nav-bar {
      background-color: var(--color-tint);
      color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动: */
    // position: fixed;
    // left: 0;
    // right: 0;
    // top: 0;
    // z-index: 9;
    }
  }
</style>