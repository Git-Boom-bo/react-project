// 对axios的二次分装
import axios from 'axios'  
import qs from 'querystring' //用来把请求来的数据转换成urlencoded
import {message} from 'antd'
//配置请求基础路径
axios.defaults.baseURL='http://localhost:3000'
//配置超时时间
axios.defaults.timeout = 2000
//请求拦截器
axios.interceptors.request.use((config)=>{
    //解构config里边的method要使用post
    //解构config里边的data要用数据
    const {method,data} = config
    //有些版本post是大写 统一换成小写  判断data是不是实例
    if(method.toLowerCase() === 'post' && data instanceof Object){
        config.data = qs.stringify(data)
    }
    return config
})

//响应拦截器
axios.interceptors.response.use(
    //成功的回调：返回状态2开头
    response =>{
        return response.data
    },
    //失败的回调：1.返回的状态不是2开头，2.达到了超时时间 3.网络不通
    error =>{
        //出错的提醒框
        // message.error(error.message)
        let errmsg = '未知错误，请联系管理员'
        //message.indexOf错误信息里包含。。。信息
        if(message.indexOf('401'!==-1)){
            return errmsg ='未登录或身份过期，请重新登录'
        }else if(message.indexOf('Network Error')!==-1){
            return errmsg = '网络不通，请检测网络链接'
        }else if(message.indexOf('timeout')!==-1){
           return errmsg ='网络不稳定，连接超时'           
        }else{
            message.error(errmsg)
        }
        //中断promise链
        return new Promise(()=>{})
    }
)

export default axios