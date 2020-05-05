import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import Header from './Header/Header'
import './css/admin.less'

// import {deleteUserInfo} from '../../redux/actions/login'
const { Footer, Sider, Content } = Layout;

@connect(
    (state)=>({
        // username:state.userInfo.user.username,
        isLogin:state.userInfo.isLogin
    }),//映射状态
    {}//映射操作状态的方法
)
class Admin extends Component {
    
   
    render() {
        if(!this.props.isLogin){ 
            return <Redirect to='/login'/>
        }
        return (
            <Layout className="admin-body">
                <Sider>Sider</Sider>
                <Layout>
                    <Header/>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
          </Layout>
        )
    }
}
export default Admin