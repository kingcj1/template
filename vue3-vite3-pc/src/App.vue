<template>
  <el-scrollbar v-if="pageShow" class="page-root">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="keepAliveRouters">
        <component :is="Component" v-if="route.meta.keepAlive && isRouterAlive" :key="route.name" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive && isRouterAlive" :key="route.name" />
    </router-view>
  </el-scrollbar>
  <template v-else>
    <img src="@/assets/images/loading.gif" alt="" class="loading">
  </template>
</template>

<script>
import { userInfo } from '@/api/app.js';
import { useStore } from '@/store';
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      'isRouterAlive': true,
      'pageShow': false
    });

    const keepAliveRouters = computed(() => {
      return store.user.message;
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
          store.system.updateRouterList(route);
        }
      },
      { 'immediate': true }
    );

    const getUserInfo = () => {
      // 用户信息
      userInfo().then((result) => {
        store.user.updateAdUser(result.LN);
        if (process.env.NODE_ENV == 'development') {
          store.user.updateAdUser('qian.zhang');
        }
        store.user.updateUserInfo(result);
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
