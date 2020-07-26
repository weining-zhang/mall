<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content"
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll">
      <DetailSwiper :top-images="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <DetailParamInfo ref="params" :param-info="paramInfo"/>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
      <GoodsList ref="recommend" :goods="recommends"/>
    </Scroll>
    <DetailBottomBar @addCart="addToCart"/>

    <BackTop @click.native="backClick" v-show="isShowBackTop" />
    <Toast :message="message" :is-show="show"/>
  </div>
</template>

<script>
  import DetailNavBar from './childCompos/DetailNavBar'
  import DetailSwiper from './childCompos/DetailSwiper'
  import DetailBaseInfo from './childCompos/DetailBaseInfo'
  import DetailShopInfo from './childCompos/DetailShopInfo'
  import DetailGoodsInfo from './childCompos/DetailGoodsInfo'
  import DetailParamInfo from './childCompos/DetailParamInfo'
  import DetailCommentInfo from './childCompos/DetailCommentInfo'
  import DetailBottomBar from './childCompos/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import Toast from 'components/common/toast/Toast'

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
  import { debounce } from "common/utils"
  import { backTopMixin } from "common/mixin"

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      Toast
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        message: '商品成功添加到购物车',
        show: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详细数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取数据
        const data = res.result;

        // 2.取出顶部轮播图的数据
        this.topImages = res.result.itemInfo.topImages

        // 3.创建商品的对象
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 5.取出商品详细信息
        this.detailInfo = data.detailInfo

        // 6.取出参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 7.取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // // 1.第一次获取offsetTop，值不对。原因：this.$refs.params.$el还没有渲染
        // this.themeTopYs = []

        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);

        // // 2.第二次获取offsetTop值不对。原因：图片没计算在内(未加载完成)
        // this.$nextTick(() => {
        //   this.themeTopYs = []

        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // })
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })

      // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        this.themeTopYs.push(Number.MAX_VALUE);//method：contentScroll()方法二优化

        console.log(this.themeTopYs);
      }, 100)
    },
    mounted() {
      //1.监听item中的图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('detailItemImgLoad', () => {
        refresh()
      })
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) { //点击标题跳转到对应内容
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] +44, 300)
      },
      contentScroll(position) { // 功能：使滚动到的内容在顶上显示对应标题
        // 1.获取Y值
        const positionY = -position.y + 44

        // 2.获取Y值和主题中的值进行对比
        // [0, 2613, 3969, 4164]
        // positoinY 在 0 和 2613之间，index = 0
        // positoinY 在 =2613 和 3969之间，index = 1
        // positoinY 在 =3969 和 4164之间，index = 2

        // positoinY 大于等于 4164 值，index = 3

        // 方法一：
        // if (positionY >= this.themeTopYs[0] && positionY < this.themeTopYs[1]) {
        //   this.currentIndex = 0;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // } else if (positionY >= this.themeTopYs[1] && positionY < this.themeTopYs[2]) {
        //   this.currentIndex = 1;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // } else if (positionY >= this.themeTopYs[2] && positionY < this.themeTopYs[3]) {
        //   this.currentIndex = 2;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // } else {
        //   this.currentIndex = 3;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }

        // 方法二：
        // let length = this.themeTopYs.length
        // this.themeTopYs.forEach((currentThemeTopY, index) => {
        //   if (this.currentIndex !== index && ((index < length - 1 && positionY >= this.themeTopYs[index] && 
        //   positionY < this.themeTopYs[index+1]) || (index === length - 1 && positionY >=this.themeTopYs[index]))) {
        //     this.currentIndex = index;
        //     this.$refs.nav.currentIndex = this.currentIndex;
        //   }
        // })

        // 方法二优化：
        // [0, 2613, 3969, 4164, Number.MAX_VALUE]
        // positoinY 在 0 和 2613之间，index = 0
        // positoinY 在 =2613 和 3969之间，index = 1
        // positoinY 在 =3969 和 4164之间，index = 2
        // positoinY 在 4164 和 非常大的值之间，index = 3
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && 
          positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

        // 3.判断BackTop是否显示
        this.listenShowBackTop(position)
      },
      addToCart() { //点击添加到购物车
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.newPrice;
        product.realPrice = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车
        // this.$store.commit('addCart', product)
        this.addCart(product).then(res => {
          console.log(res);
          this.show = true;

          setTimeout(() => {
              this.show = false
          }, 1000)

          // this.$toast.show(res, 1000)
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

</style>
