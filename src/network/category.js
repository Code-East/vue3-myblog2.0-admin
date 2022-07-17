import request from './request.js'

//获取所有类别
export const getAllCategorys = () => {
    return request({
        url: '/category/getallcategorys'
    })
}
//获取类别列表
export const getCategorys = (page, pageSize) => {
    return request({
        url: '/category/getcategorys',
        params: {
            page,
            pageSize
        }
    })
}
//获取类别总数
export const getCategoryCount = (text) => {
    return request({
        url: '/category/getcategorycount?text=' + text
    })
}
//增加类别
export const addCategory = (data) => {
    return request({
        url: '/category/addcategory',
        method: 'post',
        data
    })
}
//搜索类别
export const searchCategory = (data) => {
    return request({
        url: "/category/searchcategory",
        params: data
    })
}

//删除类别的请求函数
export const deleteCategory = (id) => {
    return request({
        url: '/category/deletecategory',
        method: 'post',
        data: {
            id
        }
    })
}

//获取单个类别的请求
export const getSingleCategory = (id) => {
    return request({
        url: '/category/getsinglecategory/' + id
    })
}

//修改类别
export const setCategory = (data) => {
    return request({
        url: '/category/setcategory',
        method: "post",
        data
    })
}
