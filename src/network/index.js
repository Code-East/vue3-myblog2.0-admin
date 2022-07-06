import request from './request';

export const tokenTime = () => {
    return request({
        url: '/checktoken'
    })
}