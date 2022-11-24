import {
    createRouter,
    createWebHistory
} from 'vue-router'
import { useStore } from '@/store';
const routes = [
    {
        'path': '/',
        'redirect': '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/home.vue'),
        meta: {
            title: '首页'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/**
 * 全局前置守卫
 * 根据meta-title属性设置导航栏标题
 * 默认标题-销售数据看板
 */
router.beforeEach((to, from, next) => {
    
    if (Object.prototype.hasOwnProperty.call(to.meta, 'keepAlive')) {
        let router = to.name;
        useStore().system.updateRouterList(router)
    }
    document.title = to.meta.title;
    next();
});


export default router

//注册给app
export const useRouter = (app) => {
    app.use(router);
}