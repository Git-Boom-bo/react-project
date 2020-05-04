import React, { Component } from 'react'
import { Form, Input, Button,message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {saveUserInfo} from '../../redux/actions/login'
import {reqLogin} from '../../api'
import Logo from './images/logo.png'  
import './css/login.less'

const {Item} = Form 

    

class Login extends Component {  
        //表单提交成功的回调
        onFinish = async values => {
            let result = await reqLogin(values)//获取请求结果
            const {status,msg,data} = result
            if(status===0){
                message.success('登录成功',1)//跳转页面
                this.props.saveUserInfo(data)
                this.props.history.replace('/admin')
            }else{
                message.error(msg)
            }
        };
      //自定义密码校验
        pwdValidator = (_,value)=>{
            let errMsgArr = []
            if(!value.trim()) return Promise.reject('密码必须输入！')
            if(value.length < 4) errMsgArr.push('密码必须大于等于4位')
            if(value.length > 12)errMsgArr.push('密码必须小于等于12位')
            if(!(/^\w+$/).test(value)) errMsgArr.push('密码必须是英文、数字、下划线组成！')
            if(errMsgArr.length !== 0) return Promise.reject(errMsgArr)
            else return Promise.resolve()
        }
    render() { 
        return (
            <div className ="login">
                <header>
                    <img src={Logo} alt="Logo"/>
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <span className="title">用户登录</span>
                    <div>
                        
                    <Form 
                        className="login-form"
                        onFinish={this.onFinish}//表单提交的回调
                        >
                        <Item
                            name='username'
                            rules={[
                                {required:true,message:'用户名必须输入'},
                                {min:4,message:'用户名必须大于4位'},
                                {max:12,message:'用户名必须小于12位'},
                                {pattern:/^\w+$/,message:'用户名必须是英文、数组、下划线组成'}

                            ]}
                        >
                            <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="用户名"/>
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                {validator:this.pwdValidator}
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Item>                       
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            
                        </Item> 
                        </Form>
                    </div>
                </section>
            </div>
        )
    }   
}

export default connect(
    ()=>{},//映射状态
    {saveUserInfo}//映射操作状态
)(Login)
