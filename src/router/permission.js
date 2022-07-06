
//定义设置路由的前置守卫方法
export const routerPermission = (router) => {
    //定义不需要token 也可进入的白名单
    const whiteList = ['/login']
    //定义路由的前置守卫
    router.beforeEach((to, from, next) => {
        //判断localStorage中是否存在token 就是是否登入
        if (localStorage.getItem('token')) {
            //如果有登入 还要去登入页面就 把它跳转到index页面
            if (to.path === '/login') {
                next('/');
            } else {
                //如果没去login页面 就直接继续
                next();
            }
            //没有token 也就是没有登入
        } else {
            //判断是否在白名单中 在就让他跳转 不在就跳转到login页面
            if (whiteList.includes(to.path)) {
                next();
            } else {
                next('/login')
            }
        }
    })
}
