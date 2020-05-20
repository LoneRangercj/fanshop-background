import request from '@/utils/request.js'
const baseURL = "http://localhost:3000";

/**
 * 方法作用： 请求中控服务器 获取商品列表
 * @param {*} params  类型options 对象 接收请求参数
 * 返回promise 对象
 */
export function fetchList(params) {
    //   request 作用发送请求  参数是对象
    //   对象中 url 请求地址  method 请求方法  options对象 请求参数
    return request({
        url: `${baseURL}/goodslist/list`,// 请求路径
        params,// 请求参数
        method: 'get' // 请求方法
    })
}

/**
 * 方法作用：连接中控服务器，将数据存到数据库中
 * @param {*} params 
 */
export function addGoods(data) {
    return request({
        url: `${baseURL}/goodslist/addGoods`,// 请求路径
        data,// 请求参数
        method: 'post' // 请求方法
    })
}
/**
 * 删除添加的商品
 * @param {*} params 
 */
export function del(params){
    return request({
        method:'get',
        url:`${baseURL}/goodslist/del`,
        params,
    })
}