//用来管理项目ajax请求
import ajax from './ajax'
import jsonp from 'jsonp'
import {CITY,WEATHER_AK} from '@/config/index'
import {message} from 'antd'
// import { adjustStyleLoaders } from 'customize-cra'
//请求登录的函数 values包括username和password
export const reqLogin = (values) =>ajax.post('/login',values)
//请求天气信息
export const reqWeatherData = () =>{
    const URL = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`

    return new  Promise((resolve)=>{
        jsonp(URL,{
            timeout:3000,
        },(err,data)=>{
            if(!err){
                resolve(data.results[0].weather_data[0])
            }else{
                message.error('请求天气信息出错')
            }
        })
    })
}
//请求分类列表
export const reqList =() =>ajax.get('/manage/category/list')
//请求商品数据（分页）
export const reqProductList=(pageNum,pageSize)=>ajax.get('/manage/product/list',{params:{pageNum,pageSize}})
//请求搜索商品
export const reqSearchProduct = (pageNum,pageSize,searchType,keyWord)=>ajax.get('/manage/product/search',{params:{pageNum,pageSize,[searchType]:keyWord}})
//商品上架、下架
export const reqUpdataProductStatus = (productId,status)=>ajax.post('/manage/product/updateStatus',{productId,status})
//商品详情信息
export const reqProductInfoById = (productId)=> ajax.get('/manage/product/info',{params:{productId}})