//用来管理项目ajax请求
import ajax from './ajax'

    //请求登录的函数 values包括username和password
    export const reqLogin = (values) =>ajax.post('/login',values)