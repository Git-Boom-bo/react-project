//用来管理项目ajax请求
import ajax from './ajax'
import jsonp from 'jsonp'
import {CITY,WEATHER_AK} from '@/config/index'
import {message} from 'antd'
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