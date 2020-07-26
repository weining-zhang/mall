<template>
  <div id="home" class="wrapper">
    <NavBar class="nav-home"><template #center><div>购物街</div></template></NavBar>
    <TabControl :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl1" 
                  class="tab-control" v-show="isTabFixed" />
    <Scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true" 
            @pullingUp="loadMore" >
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <RecommendView :recommends="recommends"/>
      <FeatureView/>
      <TabControl :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl2" />
      <GoodsList :goods="getGoods" />
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childCompos/HomeSwiper'
import RecommendView from './childCompos/RecommendView'
import FeatureView from './childCompos/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from "network/home"
import { debounce } from "common/utils"
import { backTopMixin } from "common/mixin"

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 1)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //1.监听item中的图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('homeItemImgLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      if(index === 0) this.currentType = 'pop';
      else if(index === 1) this.currentType = 'new';
      else if(index === 2) this.currentType = 'sell';
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.listenShowBackTop(position)

      // 2.决定tabControl是否吸顶(position：fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      //2.获取TabControl的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed: {
    getGoods() {
      return this.goods[this.currentType].list
    }
  }
};
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;

    position: relative;
  }

  .nav-home {
    background-color: var(--color-tint);
    color: white;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动: */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
