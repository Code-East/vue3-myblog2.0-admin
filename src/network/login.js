//导入封装的axios
import request from './request';

//导入获取验证码地址
export const getCaptcha = () => {
    return request({
        url: '/getcaptcha',
        method: 'get'
    })
}

//导入登入方法
export const login = (data) => {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}