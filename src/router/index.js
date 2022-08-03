import { createRouter, createWebHistory } from 'vue-router';
//导入设置路由前置守卫函数
import { getMeunList } from 'network/index'

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

let isadmin;
getMeunList().then((res)=>{
    isadmin = res.data.isadmin;
})
//定义不需要token 也可进入的白名单
const whiteList = ['/login'];
//定义只有管理员才能访问的页面黑名单
const blockList = ['/user', '/tag', '/category', '/comment']
//定义路由的前置守卫
router.beforeEach((to, from, next) => {
    //判断localStorage中是否存在token 也就是判断是否登入
    if (localStorage.getItem('token')) {
        //判断是否是管理员 不是管理员进不了黑名单页面
        if (isadmin != 1 && blockList.includes(to.path)) {
            next('/index');
        }
        //如果有登入 还要去登入页面就 把它跳转到index页面
        if (to.path === '/login') {
            next('/index');
        } else {
            //如果没去login页面 就直接继续
            
            next();
        }
    } else { //没有token 也就是没有登入
        //判断是否在白名单中 在就让他跳转 不在就跳转到login页面
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login')
        }
    }
})

export default router;