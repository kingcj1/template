<!--
 * @Author: kingcj
 * @Date: 2023-01-05 16:17:53
 * @LastEditors: kingcj
 * @LastEditTime: 2023-03-07 17:46:35
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
-->
<template>
  <nut-config-provider>
    <router-view v-slot="{ Component, route }" v-if="pageShow">
      <keep-alive :include="keepAliveRouters">
        <component :is="Component" v-if="route.meta.keepAlive && isRouterAlive" :key="route.name" />
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive && isRouterAlive" :key="route.name" />
    </router-view>
  </nut-config-provider>
</template>

<script>
import { userInfo } from '@/api/app.js';
import { useStore } from '@/store';
export default {
  setup() {
    const { user, system } = useStore();
    const use_route = useRoute();
    const router = useRouter();
    const data = reactive({
      'pageShow': false,
      'isRouterAlive': true
    });
    const keepAliveRouters = computed(() => system.routerList);

    provide('reload', () => {
      data.isRouterAlive = false;
      nextTick(() => {
        data.isRouterAlive = true;
      });
    });

    watch(
      () => use_route,
      (to) => {
        if (Object.prototype.hasOwnProperty.call(to.meta, 'keepAlive') && to.meta.keepAlive) {
          let routeName = to.name;
          system.updateRouterList(routeName);
        }
      },
      { 'immediate': true }
    );

    const getUserInfo = () => {
      // 用户信息
      data.pageShow = false;
      userInfo().then((result) => {
        user.updateAdUser(result.LN);
        if (import.meta.env.MODE == 'development') {
          // user.updateAdUser('san.zhang');
        }
        data.pageShow = true;
        if (`${result.errcode}` !== '0') {
          router.replace('/401');
        }
        user.updateUserInfo(result);
      }).catch(() => {
        router.replace('/401');
      });
    };

    onMounted(() => {
      router.replace('/');
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
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: #F8F9FB;

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
