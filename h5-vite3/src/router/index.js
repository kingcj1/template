/*
 * @Author: kingcj
 * @Date: 2023-02-21 09:49:28
 * @LastEditors: kingcj
 * @LastEditTime: 2023-02-22 11:16:30
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { useStore } from '@/store';
const routes = [
  {
    'path': '/',
    'redirect': '/home'
  },
  {
    'path': '/home',
    'name': 'Home',
    'component': () => import('@/views/Home/home.vue'),
    'meta': {
      'title': '年度绩效等级查询'
    }
  },
  {
    'path': '/401',
    'name': 'NoPermission',
    'component': () => import('@/views/NoPermission/401.vue'),
    'meta': {
      'title': '无权限'
    }
  },
  {
    'path': '/502',
    'name': 'SystemUpgrade',
    'component': () => import('@/views/NoPermission/502.vue'),
    'meta': {
      'title': '系统升级'
    }
  },
  {
    'path': '/404',
    'name': 'PageNotExist',
    'component': () => import('@/views/NoPermission/404.vue'),
    'meta': {
      'title': '页面丢失'
    }
  }
];

const router = createRouter({
  'history': createWebHashHistory(),
  routes
});

/**
 * 全局前置守卫
 * 根据meta-title属性设置导航栏标题
 * 默认标题-销售数据看板
 */
router.beforeEach((to, from, next) => {
  if (Object.prototype.hasOwnProperty.call(to.meta, 'keepAlive')) {
    let router = to.name;
    useStore().system.updateRouterList(router);
  }
  document.title = to.meta.title;
  next();
});

export default router;

//注册给app
export const useRouter = app => {
  app.use(router);
};
