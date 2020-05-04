import React, { Component } from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {deleteUserInfo} from '@/redux/actions/login'
import  './css/header.less'

const { confirm } = Modal
class Header extends Component {
    state={
        ifFull:false
    }
    //退出登录
    logout =()=>{
        confirm({
			title: '确定退出登录吗？', //弹窗的提示
			icon: <ExclamationCircleOutlined />, //图标
			cancelText:'取消',
			okText:'确认',
			onOk:()=> { 
				this.props.deleteUserInfo()
			}
		})
    }
    //全屏切换
    full=()=>{
        
        screenfull.toggle()
    }
    componentDidMount(){
		//检测屏幕的变化
		screenfull.onchange(()=>{
			const {isFull} = this.state
			this.setState({isFull:!isFull})
		})
    }
    
    render() {
        return (
            <div className="header">
            <div className="header-top">
                <Button size="small" onClick={this.full}>
                    {this.state.isFull?<FullscreenExitOutlined/>:<FullscreenOutlined/>}
                    
                </Button>
                <span className="username">欢迎,马先生</span>
                <Button type="link" size="small" onClick={this.logout}>退出登录</Button>
            </div>
            <div className="header-bottom">
                <div className="bottom-left">
                    <span>首页</span>
                </div>
                <div className="bottom-right">
                    <span>2020年5月4日 00:00:00</span>
                    <img src='' alt=""/>
                    <span>晴转多云</span>
                    <span>温度：0~-8℃</span>
                </div>
            </div>
        </div>
        )
    }
}
export default connect(
    (state)=>({
        
    }),//映射状态
    {deleteUserInfo}//映射状态方法
)(Header)
