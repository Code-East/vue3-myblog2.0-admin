import request from './request.js'

//获取所有标签列表
export const getAllTags = () => {
    return request({
        url: '/tag/getalltags',
    })
}
//获取标签列表
export const getTags = (page, pageSize) => {
    return request({
        url: '/tag/gettags',
        params: {
            page,
            pageSize
        }
    })
}
//获取标签总数
export const getTagCount = (text) => {
    return request({
        url: '/tag/gettagcount?text=' + text
    })
}
//增加标签
export const addTag = (data) => {
    return request({
        url: '/tag/addtag',
        method: 'post',
        data
    })
}
//搜索标签
export const searchTag = (data) => {
    return request({
        url: "/tag/searchtag",
        params: data
    })
}

//删除标签的请求函数
export const deleteTag = (id) => {
    return request({
        url: '/tag/deletetag',
        method: 'post',
        data: {
            id
        }
    })
}

//获取单个标签的请求
export const getSingleTag = (id) => {
    return request({
        url: '/tag/getsingletag/' + id
    })
}

//修改标签
export const setTag = (data) => {
    return request({
        url: '/tag/settag',
        method: "post",
        data
    })
}
