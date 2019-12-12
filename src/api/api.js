// import axios from "axios";
import httpAxios from "../utils/request.js"

// 登录
export const login=(params)=>httpAxios.post('/api/user/login',params);

// 注册
export const registy=(params)=>httpAxios.post('/api/user/registry',params);

// banner图
export const banner=()=>httpAxios.get('/api/home/banner')

// 分类左侧数据列表
export const classify=()=>httpAxios.get('/api/shop/shopType')

// bscroll
export const scroll=(params)=>httpAxios.get('/api/home/shop',{params})

// 分类里面的右侧筛选数据列表
export const selectType=(params)=>httpAxios.get('/api/shop/selectType',{params})

// 给购物车里面添加商品
export const addCar=(params)=>httpAxios.post('/api/car/addCar',params)

// 获取用户信息
export const getUserInfo=()=>httpAxios.get('/api/user/getUserInfo')

// 获取购物车里面的内容
export const getCar =(params)=>httpAxios.get('/api/car/getCar',{params})

// 删除购物车商品件数
export const aa=(params)=>httpAxios.post('/api/car/removeCar',params)



