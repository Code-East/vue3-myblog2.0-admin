import request from './request';
//检测token
export const tokenTime = () => {
    return request({
        url: '/checktoken'
    })
}
//获取作者的所有文章
export const getAuthorArticle = () => {
    return request({
        url: '/getcrticlecount'
    })
}
//获取作者的所有文章喜欢
export const getArticleLike = () => {
    return request({
        url: '/getlikecount'
    })
}
//获取作者的所有文章评论
export const getComments = () => {
    return request({
        url: '/getcommentcount'
    })
}
//获取所有的所有like
export const getallLike = () => {
    return request({
        url: '/getall_like'
    })
}
//获取文章分类
export const getArticleCatrgory = () => {
    return request({
        url: '/getarticlecatrgory'
    })
}
//获取用户权限
export const getMeunList = () => {
    return request({
        url: '/getmeunlist'
    })
}
//获取所有文章总数
export const getArticleCount = (text = '') => {
    return request({
        url: '/article/getcount?text=' + text
    })
}