import * as dd from 'dingtalk-jsapi';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import {
  MD
} from '@/utils/tools';
Vue.use(VueRouter);

const Culture = () => import('@/views/Culture/index'); // 企业文化
const CultureDetails = () => import('@/views/Culture/details'); // 企业文化详情图
const horizontal = () => import('@/views/Horizontal/index');
const page401 = () => import('@/views/NoPermission/401.vue'); // 无权限
const page502 = () => import('@/views/NoPermission/502.vue'); // 系统升级
const routes = [{
  'path': '/',
  'redirect': '/qywh'
},
{
  'path': '/qywh',
  'name': 'QYWH',
  'component': Culture,
  'meta': {
    'title': '企业文化',
    'keepAlive': true
  }
},
{
  'path': '/qywh/details',
  'name': 'QYWHDetails',
  'component': CultureDetails,
  'meta': {
    'title': '企业文化详情'
  }
},
{
  'path': '/horizontal',
  'component': horizontal,
  'meta': {
    'title': '横屏调试',
    'keepAlive': false
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
  scrollBehavior (to, from, savedPosition) {
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
  if (dd && dd.env.platform !== 'notInDingTalk' && to.meta.title) { // 判断钉钉环境
    MD(to.meta.title);
    // document.title = to.meta.title;
    dd.biz.navigation.setTitle({
      'title': `${document.title}`
    });
  }
  next();
});

export default router;