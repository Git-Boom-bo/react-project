// 对axios的二次分装
import axios from 'axios'  
import qs from 'querystring' //用来把请求来的数据转换成urlencoded
import nprogress from 'nprogress'//引入进度条
import 'nprogress/nprogress.css'
import {message as msg} from 'antd'
//配置请求基础路径
axios.defaults.baseURL='/api'
//配置超时时间
axios.defaults.timeout = 2000
//请求拦截器

axios.interceptors.request.use((config)=>{
    //解构config里边的method要使用post
    //解构config里边的data要用数据
    nprogress.start()
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
        nprogress.done()
        return response.data
    },
    //失败的回调：1.返回的状态不是2开头，2.达到了超时时间 3.网络不通
    err => {
        nprogress.done()
		let errmsg = '未知错误，请联系管理员'
		const {message} = err
		if(message.indexOf('401') !== -1) errmsg = '未登录或身份过期，请重新登录！'
		else if(message.indexOf('Network Error') !== -1) errmsg = '网络不通，请检查网络连接！'
		else if(message.indexOf('timeout') !== -1) errmsg = '网络不稳定，连接超时！'
		msg.error(errmsg,1)
		return new Promise(()=>{})
	}
)

export default axios