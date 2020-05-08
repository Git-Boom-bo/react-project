import React, { Component } from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {reqWeatherData} from '@/api'
import {deleteUserInfo} from '@/redux/actions/login'
import  './css/header.less'

const { confirm } = Modal
class Header extends Component {
    state={
        ifFull:false,//是否全屏
        time:dayjs().format('YYYY年MM月DD日 HH:mm:ss'), //时间
        weatherDate:{}//天气信息
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
    //接受到天气信息
    getWeather=async()=>{
        let result = await reqWeatherData()
        const {dayPictureUrl,weather,temperature} = result
        this.setState({weatherData:{dayPictureUrl,weather,temperature}})
    }

    componentDidMount(){
		//检测屏幕的变化
		screenfull.onchange(()=>{
			const {isFull} = this.state
			this.setState({isFull:!isFull})
        })
        //时间的定时器每秒走动
        this.timer = setInterval(()=>{
            this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
        },1000)
        //请求天气信息
        this.getWeather()
    }
    
    render() {
        return (
            <div className="header">
            <div className="header-top">
                <Button size="small" onClick={this.full}>
                    {this.state.isFull?<FullscreenExitOutlined/>:<FullscreenOutlined/>}
                    
                </Button>
        <span className="username">欢迎,{this.props.username}</span>
                <Button type="link" size="small" onClick={this.logout}>退出登录</Button>
            </div>
            <div className="header-bottom">
                <div className="bottom-left">
                    <span>首页</span>
                </div>
                <div className="bottom-right">
                    <span>{this.state.time}</span>
                    <img src={this.state.weatherDate.dayPictureUrl} alt="logo"/>
                    <span>{this.state.weatherDate.weather}</span>
                    <span>温度：{this.state.weatherDate.temperature}</span>
                </div>
            </div>
        </div>
        )
    }
}
export default connect(
    (state)=>({
        username:state.userInfo.user.username
    }),//映射状态
    {deleteUserInfo}//映射状态方法
)(Header)
