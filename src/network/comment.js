import request from './request.js'

//获取评论列表
export const getComments = (page, pageSize) => {
    return request({
        url: '/comment/getcomments',
        params: {
            page,
            pageSize
        }
    })
}
//获取评论总数
export const getCommentCount = (text = '') => {
    return request({
        url: '/comment/getcommentcount?text=' + text
    })
}
//搜索评论
export const searchComment = (data) => {
    return request({
        url: "/comment/searchcomment",
        params: data
    })
}

//删除评论的请求函数
export const deleteComment = (id) => {
    return request({
        url: '/comment/deletecomment',
        method: 'post',
        data: {
            id
        }
    })
}

//获取单个评论的请求
export const getSingleComment = (id) => {
    return request({
        url: '/comment/getsinglecomment/' + id
    })
}

//获取回复评论
export const getReplyComment = (id) => {
    return request({
        url: '/comment/getreplycomment/' + id
    })
}
