import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import Check from '../HOC/Check'
import { Layout } from 'antd';
import Header from './Header/Header'
import LeftNav from './LeftNav/LeftNav'
import Bar from './Bar/Bar'
import Category from './Category/Category'
import Home from './Home/Home'
import Line from './Line/Line'
import Pie from './Pie/Pie'
import Product from './Product/Product'
import Role from './Role/Role'
import User from './User/User'
import AddUpdate from '@/containers/Admin/Product/AddUpdate/AddUpdate'
import Detail from '@/containers/Admin/Product/Detail/Detail'

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
@Check
class Admin extends Component {
    
   
    render() {
        // if(!this.props.isLogin){ 
        //     return <Redirect to='/login'/>
        // }
        return (
            <Layout className="admin-body">
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content className='content'>
                        <Switch>
                            <Route path="/admin/home" component={Home}/>
                            <Route path="/admin/prod_about/category" component={Category}/>
							<Route path="/admin/prod_about/product" exact component={Product}/>
							<Route path="/admin/user" component={User}/>
							<Route path="/admin/role" component={Role}/>
							<Route path="/admin/charts/bar" component={Bar}/>
							<Route path="/admin/charts/line" component={Line}/>
							<Route path="/admin/charts/pie" component={Pie}/>
							<Route path="/admin/prod_about/product/add" component={AddUpdate}/>
							<Route path="/admin/prod_about/product/update/:id" component={AddUpdate}/>
							<Route path="/admin/prod_about/product/detail/:id" component={Detail}/>


							<Redirect to="/admin/home"/>
                        </Switch>
                    </Content>
                    <Footer className='footer'>推荐使用谷歌浏览器效果更佳</Footer>
                </Layout>
          </Layout>
        )
    }
}
export default Admin