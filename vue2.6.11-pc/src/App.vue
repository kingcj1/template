<!--
 * @Author: jingzhangjian
 * @Date: 2023-03-13 10:28:08
 * @LastEditors: jingzhangjian
 * @LastEditTime: 2023-03-13 11:39:25
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
-->
<!--
 * @Author: jingzhangjian
 * @Date: 2023-03-13 10:28:08
 * @LastEditors: jingzhangjian
 * @LastEditTime: 2023-03-13 11:35:27
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
-->
<template>
  <div id="app">
    <template v-if="pageShow">
      <keep-alive :include="keepAliveRouters">
        <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive" />
    </template>
    <template v-else>
      <img src="@/assets/images/loading.gif" alt="" class="loading">
    </template>
  </div>
</template>

<script>
export default {
  'components': {},
  provide () {
    return {
      'reload': this.reload
    };
  },
  data () {
    return {
      'isRouterAlive': true,
      'pageShow': false
    };
  },
  'computed': {
    keepAliveRouters () {
      return this.$store.state.system.routers;
    }
  },
  'watch': {
    $route (to, from) {
      if (to.meta.hasOwnProperty('keepAlive') && to.meta.keepAlive) {
        let router = to.name;
        this.$store.commit('setRouterList', router);
      }
    }
  },
  created () {
    this.init();
  },
  'methods': {
    init () {
      this.pageShow = true;
    },
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang='less' scoped>
#app {
  height: 100vh;
  width: 100vw;
  position: relative;

  .loading {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    height: 300px;
    object-fit: contain;
  }
}
</style>
