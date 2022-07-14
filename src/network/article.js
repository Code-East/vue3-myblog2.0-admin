import request from './request.js'

//获取标签列表
export const getArticles = (page, pageSize) => {
    return request({
        url: '/article/getarticles',
        params: {
            page,
            pageSize
        }
    })
}
//获取标签总数
export const getArticleCount = (text) => {
    return request({
        url: '/article/getcount?text=' + text
    })
}
//增加标签
export const addArticle = (data) => {
    return request({
        url: '/article/add',
        method: 'post',
        data
    })
}
//搜索标签
export const search = (data) => {
    return request({
        url: "/article/search",
        params: data
    })
}

//删除标签的请求函数
export const deleteArticle = (id) => {
    return request({
        url: '/article/delete',
        method: 'post',
        data: {
            id
        }
    })
}

//获取单个标签的请求
export const getSingleArticle = (id) => {
    return request({
        url: '/article/getsingle/' + id
    })
}

//修改标签
export const setArticle = (data) => {
    return request({
        url: '/article/update',
        method: "post",
        data
    })
}
