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
export const getUserCount = () => {
    return request({
        url: '/user/getusercount'
    })
}

//获取用户总数的请求函数
export const addUser = (data) => {
    return request({
        url: '/user/adduser',
        method: 'post',
        data
    })
}