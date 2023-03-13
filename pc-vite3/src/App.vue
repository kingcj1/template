<!--
 * @Author: kingcj
 * @Date: 2023-01-05 16:17:53
 * @LastEditors: kingcj
 * @LastEditTime: 2023-03-07 17:23:14
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
-->
<template>
  <el-config-provider :locale="locale" size="small">
    <el-scrollbar v-loading="loading" class="page-root">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="keepAliveRouters">
          <component :is="Component" v-if="route.meta.keepAlive && isRouterAlive" :key="route.name" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive && isRouterAlive" :key="route.name" />
      </router-view>
    </el-scrollbar>
  </el-config-provider>
</template>

<script>
import { userInfo } from '@/api/app.js';
import { useStore } from '@/store';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';
export default {
  setup() {
    const { user, system } = useStore();
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      'isRouterAlive': true,
      'language': (navigator.language) ? navigator.language : navigator.userLanguage
    });
    const loading = computed(() => system.isLoading);
    const keepAliveRouters = computed(() => system.routerList);
    const locale = computed(() => (data.language.search(/zh-cn/i) === -1 ? en : zhCn));
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
          system.updateRouterList(route);
        }
      },
      { 'immediate': true }
    );

    const getUserInfo = () => {
      // 用户信息
      userInfo().then((result) => {
        user.updateAdUser(result.LN);
        if (import.meta.env.MODE == 'development') {
          // user.updateAdUser('san.zhang');
        }
        user.updateUserInfo(result);
        if (`${result.errcode}` !== '0') {
          router.replace('/401');
        }
      }).catch(() => {
        router.replace('/401');
      });
    };

    onMounted(() => {
      router.replace('/');
      getUserInfo();
    });

    return {
      locale,
      keepAliveRouters,
      loading,
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
}
</style>
