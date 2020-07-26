<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTabbar class="MainTabbar"/>
  </div>
</template>

<script>
  import MainTabbar from 'components/content/mainTabbar/MainTabBar.vue';

  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>

<style>
  @import 'assets/css/base.css';

  /* .MainTabbar {
    z-index: 10;
  } */
</style>
