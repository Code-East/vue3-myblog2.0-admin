import { createRouter, createWebHistory } from 'vue-router';
//导入设置路由前置守卫函数
import { routerPermission } from './permission'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('view/login/index.vue')
        },
        {
            path: '/',
            name: '/',
            component: () => import('@/layout/index.vue'),
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('view/index/index.vue')
                },
                {
                    path: 'user',
                    name: 'user',
                    component: () => import('view/user/index.vue')
                },
                {
                    path: 'personal',
                    name: 'personal',
                    component: () => import('view/personal/index.vue')
                },
                {
                    path: 'article',
                    name: 'article',
                    component: () => import('view/article/index.vue')
                },
                {
                    path: 'category',
                    name: 'category',
                    component: () => import('view/category/index.vue')
                },
                {
                    path: 'comment',
                    name: 'comment',
                    component: () => import('view/comment/index.vue')
                },
                {
                    path: 'tag',
                    name: 'tag',
                    component: () => import('view/tag/index.vue')
                },
                {
                    path: 'addarticle',
                    name: 'addarticle',
                    component: () => import('view/article/addarticle/index.vue')
                },
                {
                    path: 'editorcheck',
                    name: 'editorcheck',
                    component: () => import('view/article/editorcheck/index.vue')
                },
            ]
        }
    ]
})
//设置路由前置守卫 过滤路由
routerPermission(router);

export default router;