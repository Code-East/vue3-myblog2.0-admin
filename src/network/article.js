import request from './request.js'

//获取文章列表
export const getArticles = (page, pageSize) => {
    return request({
        url: '/article/getarticlesadmin',
        params: {
            page,
            pageSize
        }
    })
}
//获取文章总数
export const getArticleCount = (text = '') => {
    return request({
        url: '/article/getarticlecount?text=' + text
    })
}
//增加文章
export const addArticle = (data) => {
    return request({
        url: '/article/addarticle',
        method: 'post',
        data
    })
}
//搜索文章
export const search = (data) => {
    return request({
        url: "/article/searcharticleadmin",
        params: data
    })
}

//删除文章的请求函数
export const deleteArticle = (id) => {
    return request({
        url: '/article/deletearticle',
        method: 'post',
        data: {
            id
        }
    })
}

//获取单个文章的请求
export const getSingleArticle = (id) => {
    return request({
        url: '/article/getsinglearticleadmin/' + id
    })
}

//修改文章
export const setArticle = (data) => {
    return request({
        url: '/article/setarticle',
        method: "post",
        data
    })
}
