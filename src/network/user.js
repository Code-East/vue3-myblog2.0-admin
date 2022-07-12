import request from './request.js'

//获取用户列表的处理函数
export const getUserList = (page, pageSize) => {
    return request({
        url: '/user/getuserlist',
        params: {
            page,
            pageSize
        }
    })
}
//获取用户总数的请求函数
export const getUserCount = (text) => {
    return request({
        url: '/user/getusercount?text=' + text
    })
}

//增加用户的请求函数
export const addUser = (data) => {
    return request({
        url: '/user/adduser',
        method: 'post',
        data
    })
}

//删除用户的请求函数
export const deleteUser = (id) => {
    return request({
        url: '/user/deleteuser',
        method: 'post',
        data: {
            id
        }
    })
}

//搜索用户请求
export const searchUser = (data) => {
    return request({
        url: "/user/searchuser",
        params: data
    })
}

//获取单个用户的请求
export const getSingleUser = (id) => {
    return request({
        url: '/user/getsingleuser/' + id
    })
}

//修改用户
export const setUser = (data) => {
    return request({
        url: '/user/setuser',
        method: "post",
        data
    })
}

