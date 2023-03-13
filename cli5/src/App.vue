<template>
  <el-scrollbar v-if="pageShow" class="page-root">
    <router-view v-slot="{ Component }">
      <keep-alive :include="keepAliveRouters">
        <component :is="Component" v-if="$route.meta.keepAlive && isRouterAlive" :key="$route.name" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive && isRouterAlive" :key="$route.name" />
    </router-view>
  </el-scrollbar>
  <img v-else src="@/assets/images/loading.gif" alt="" class="loading">
</template>

<script>
import { onMounted, reactive, toRefs, computed, provide, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userInfo } from '@/api/app.js';
import store from '@/store';
export default {
  setup () {
    const route = useRoute();

    const router = useRouter();

    const data = reactive({
      'isRouterAlive': true,
      'pageShow': false
    });

    const keepAliveRouters = computed(() => {
      return store.state.system.routers;
    });

    provide('reload', () => {
      data.isRouterAlive = false;
      nextTick(() => {
        data.isRouterAlive = true;
      });
    });

    watch(
      () => route,
      (to) => {
        if (Object.prototype.hasOwnProperty.call(to.meta, 'keepAlive') && to.meta.keepAlive) {
          let route = to.name;
          store.commit('setRouterList', route);
        }
      },
      { 'immediate': true }
    );

    const getUserInfo = () => {
      // 用户信息
      userInfo().then((result) => {
        store.commit('setAdUser', result.LN);
        if (process.env.NODE_ENV == 'development') {
          // store.commit('setAdUser', 'san.zhang');
        }
        store.commit('setUserInfo', result);
        if (result.errcode !== '0' && result.errcode !== 0) {
          router.replace('/401');
        }
      }).catch((err) => {
        console.log(err);
        router.replace('/401');
      }).finally(() => {
        setTimeout(() => {
          data.pageShow = true;
        }, 300);
      });
    };

    onMounted(() => {
      getUserInfo();
    });

    return {
      keepAliveRouters,
      ...toRefs(data)
    };
  }
};
</script>

<style lang='less'>
#app {
  height: calc(100vh);
  width: 100%;
  position: relative;

  .page-root {
    padding: 22px 16px;
    min-width: 1050px;
    background-color: #F8F9FB;
  }

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
