/*
 * @Author: jingzhangjian
 * @Date: 2023-03-13 10:28:08
 * @LastEditors: jingzhangjian
 * @LastEditTime: 2023-03-13 11:35:02
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import {
  MD
} from '@/utils/tools';
Vue.use(VueRouter);

const HomePage = () => import('@/views/HomePage/index.vue'); // 首页
const page401 = () => import('@/views/NoPermission/401.vue'); // 无权限
const page502 = () => import('@/views/NoPermission/502.vue'); // 系统升级
const routes = [{
  'path': '/',
  'redirect': '/home'
},
{
  'path': '/home',
  'name': 'HOME',
  'component': HomePage,
  'meta': {
    'title': '首页'
  }
},
{
  'path': '/401',
  'component': page401,
  'meta': {
    'title': '无权限',
    'keepAlive': false
  }
},
{
  'path': '/502',
  'component': page502,
  'meta': {
    'title': '系统升级',
    'keepAlive': false
  }
}
];

const router = new VueRouter({
  routes,
  'scrollBehavior': (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        'x': 0,
        'y': to.meta.savedPosition || 0
      };
    }
  }
});

/**
 * 全局前置守卫
 * 根据meta-title属性设置导航栏标题
 * 默认标题-销售数据看板
 */
router.beforeEach((to, from, next) => {
  if (to.meta.hasOwnProperty('keepAlive')) {
    let router = to.name;
    store.commit('setRouterList', router);
  }
  next();
});

export default router;