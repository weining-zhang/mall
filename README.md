# 基于Vue开发的电商APP项目（仿蘑菇街）

##  前言
>此项目为本人学习Vue过程中的一个练习实战项目

##  收获
- 熟悉了一个完整项目开发的流程
- 学会了组件化、模块化、工程化的开发模式
- 掌握了使用vue-cli脚手架初始化vue.js项目
- 掌握了项目的一些细节优化

##  项目描述
- 项目基于VueCLI3脚手架 + Vue全家桶 + ES6 + Webpack等技术开发
- 项目采用模块化、组件化、工程化的模式开发
- 项目主要分为四大模块：首页 + 分类 + 购物车 + 我的

##  使用的插件或第三方库
- 使用 vue-router 开发单页面
- 使用 vuex 管理应用组件的状态
- 使用 FastClick 解决移动端点击300ms延迟
- 使用 vue-lazyload 实现图片的懒加载
- 使用 axios 的封装从后端拿取数据
- 使用 less 写部分组件的样式
- 使用 better-scroll 实现移动端页面滑动效果
- 使用 vant-ui 组件库构建界面

##  实现的功能
- [x] 首页商品款式的切换
- [x] 分类页切换展示分类商品
- [x] 右下角回到顶部按钮
- [x] 商品加入购物车
- [x] 购物车内商品勾选

##  项目运行
```
# 克隆
git clone https://github.com/weining-zhang/mall.git

# 终端进入项目文件夹
cd mall

# 安装依赖
npm install

# 运行
npm run serve

访问: http://localhost:8080
```

##  项目目录结构
```
src                                             
├─ App.vue
├─ assets                                       用来存放css文件和项目的一些图片
│    ├─ css
│    │    ├─ base.css                           设置项目基本样式
│    │    └─ normalize.css                      使不同的浏览器在渲染网页元素的时候形式更统一
│    └─ img
│           ├─ cart                             存放购物车页面相关图片
│           │    └─ tick.svg                    购物车页面全选按钮图标
│           ├─ common                           存放多个页面可能使用到的图片
│           │    ├─ back.svg                    商品详情页左上角回退按钮图标
│           │    ├─ collect.svg                 首页商品图片下方收藏商品图标
│           │    └─ top.png                     首页及商品详情页回到顶部按钮图标
│           ├─ detail                           存放商品详情页相关图片
│           │    └─ detail_bottom.png           商品详情页下方客服、店铺、收藏的图标
│           ├─ home                             存放首页页面相关图片
│           │    └─ recommend_bg.jpg            首页里‘本周流行’的图片
│           ├─ profile                          存放我的信息页面相关图片
│           │    ├─ avatar.svg                  
│           │    ├─ cart.svg
│           │    ├─ message.svg
│           │    ├─ phone.svg
│           │    ├─ pointer.svg
│           │    ├─ shopping.svg
│           │    └─ vip.svg
│           └─ tabbar                           存放首页、分类、购物车、我的页面下方的tabbar相关图片
│                  ├─ category.svg
│                  ├─ category_active.svg
│                  ├─ home.svg
│                  ├─ home_active.svg
│                  ├─ profile.svg
│                  ├─ profile_active.svg
│                  ├─ shopcart.svg
│                  └─ shopcart_active.svg
├─ common
│    ├─ mixin.js                                存放可复用的组件，回到顶部按钮组件放在这
│    └─ utils.js                                封装了防抖函数和时间格式化函数
├─ components
│    ├─ common                                  存放下个项目也可使用的公共组件
│    │    ├─ navbar                           
│    │    │    └─ NavBar.vue                    封装导航栏组件
│    │    ├─ scroll
│    │    │    └─ Scroll.vue                    封装better-scroll库组件
│    │    ├─ swiper                             封装轮播图组件
│    │    │    ├─ Swiper.vue                  
│    │    │    ├─ SwiperItem.vue
│    │    │    └─ index.js                      导入上面两个组件，整合到一起
│    │    ├─ tabbar                             封装首页、分类、购物车、我的页面下方的tabbar组件
│    │    │    ├─ TabBar.vue
│    │    │    └─ TabBarItem.vue
│    │    └─ toast                              封装商品详情页加入购物车、购物车为空时点结算时消息弹出的组件
│    │           ├─ Toast.vue
│    └─ content                                 存放本项目业务相关的公共组件
│           ├─ backTop
│           │    └─ BackTop.vue                 封装回到顶部按钮组件
│           ├─ checkButton
│           │    └─ CheckButton.vue             封装购物车页面全选按钮是否被勾选的组件
│           ├─ goods                            封装展示商品相关数据的组件
│           │    ├─ GoodsList.vue
│           │    └─ GoodsListItem.vue
│           ├─ mainTabbar                       tabbar组件再封装到本项目业务相关目录下
│           │    └─ MainTabBar.vue
│           └─ tabControl                       
│                  └─ TabControl.vue            封装首页负责切换展示流行、新款、精选商品的组件
├─ main.js
├─ network                                      存放网络请求相关的组件
│    ├─ category.js                             请求分类页面的数据
│    ├─ detail.js                               请求商品详情页的数据，并设计数据结构保存请求到的商品数据
│    ├─ home.js                                 请求首页相关数据
│    └─ request.js                              封装axios
├─ router                                       存放vue-router相关配置
│    └─ index.js
├─ store                                        存放vue-x相关
│    ├─ actions.js                              从index.js抽取出来的actions，判断添加购物车相关逻辑
│    ├─ getters.js                              从index.js抽取出来的getters，获取购物车里有多少种商品
│    ├─ index.js
│    ├─ mutation-types.js                       定义一些常量来替代 Mutation 事件类型
│    └─ mutations.js                            从index.js抽取出来的mutations，处理添加购物车相关逻辑
├─ screenshots                                  项目截图
└─ views                                        存放一些视图组件
       ├─ cart                                  购物车页面
       │    ├─ Cart.vue                         购物车主页面
       │    └─ childCompos                      购物车主页面下的一些子组件
       │           ├─ CartBottomBar.vue         购物车底部处理结算一行的相关组件
       │           ├─ CartList.vue              主要处理全选按钮逻辑
       │           └─ CartListItem.vue          展示购物车的商品数据
       ├─ category                              分类页面
       │    ├─ Category.vue                     购物车主页面
       │    └─ childCompos
       │           └─ CategoryContent.vue       展示分类页面左部分列表和右部分商品数据
       ├─ detail                                商品详情页
       │    ├─ Detail.vue
       │    └─ childCompos
       │           ├─ DetailBaseInfo.vue        展示商品详情页轮播图下方的基本商品数据
       │           ├─ DetailBottomBar.vue       封装商品详情页底部组件
       │           ├─ DetailCommentInfo.vue     展示商品详情页用户评论
       │           ├─ DetailGoodsInfo.vue       展示商品详情页卖家店铺下方一系列商品图片信息
       │           ├─ DetailNavBar.vue          封装商品详情页顶部导航栏
       │           ├─ DetailParamInfo.vue       展示商品详情页商品参数
       │           ├─ DetailShopInfo.vue        展示商品详情页卖家店铺数据
       │           └─ DetailSwiper.vue          展示商品详情页的轮播图
       ├─ home                                  首页页面
       │    ├─ Home.vue
       │    └─ childCompos
       │           ├─ FeatureView.vue           展示首页本周流行，是一张图
       │           ├─ HomeSwiper.vue            展示首页轮播图
       │           └─ RecommendView.vue         展示首页轮播图下方推荐信息（十点抢卷等一行...
       └─ profile
              └─ Profile.vue                    我的页面，为一个静态页面，未实现其他功能
```

##  部分截图
###  **首页**  

![](https://github.com/weining-zhang/mall/raw/master/src/screenshots/home1.png)
![](https://github.com/weining-zhang/mall/raw/master/src/screenshots/home2.png)  

### **商品详情页**  

![](https://github.com/weining-zhang/mall/raw/master/src/screenshots/detail.png)  

### **分类页面**  

![](https://github.com/weining-zhang/mall/raw/master/src/screenshots/category.png)  

### **购物车页面**  

![](https://github.com/weining-zhang/mall/raw/master/src/screenshots/cart.png)  

### **我的页面**  

![](https://github.com/weining-zhang/mall/raw/master/src/screenshots/my.png)
