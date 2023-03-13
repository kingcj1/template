import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    'path': '/',
    'redirect': '/home'
  },
  {
    'path': '/home',
    'name': 'home',
    'meta': { 'title': '同步人员头像', 'keepAlive': false },
    'component': () => import('@/views/home/HomeView.vue')
  },
  { 
    'path': '/401', 
    'meta': { 'title': '无权限', 'keepAlive': false },
    'component': () => import('@/components/NoPermission/401.vue') 
  },
  { 
    'path': '/502',
    'meta': { 'title': '系统升级', 'keepAlive': false },
    'component': () => import('@/components/NoPermission/502.vue')
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
    store.commit('setRouterList', router);
  }
  document.title = to.meta.title;
  next();
});

export default router;
