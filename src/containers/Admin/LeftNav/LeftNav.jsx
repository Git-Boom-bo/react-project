import React, { Component } from 'react'
import {Menu} from 'antd'
//withRouter可以取到非路由组件身上的属性
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveTitle} from '@/redux/actions/title'
import logo from '@/assets/images/logo.png'
import menus from '@/config/menu_config'
import './css/left.less'

const {SubMenu,Item} = Menu;
@connect(
	()=>({}),
	{saveTitle}
)
//withRouter可以取到非路由组件身上的属性
@withRouter
class LeftNav extends Component {
	//跳转导航展示标题
	saveTitle =(title)=>{
		this.props.saveTitle(title)
	}
	//计算title
	computeTitle=()=>{
		//1.从路径中获取菜单中的key
		const {pathname} = this.props.location
		let currentKey  =pathname.split('/').slice(-1)[0]
		if(currentKey ==='admin'){
			return currentKey ='home'
		}
		//2.得到key去菜单（menu-config）中对比找到当前的菜单名字
		let  title=''
		menus.forEach((menuObj)=>{
			if(menuObj.children instanceof Array){
				let res = menuObj.children.find((childObj)=>{
					return childObj.key===currentKey
				})
				if(res){
					 title = res.title
				}
			}else{
				if(menuObj.key===currentKey){
					return title = menuObj.title
				}
			}
		})

		this.props.saveTitle(title)
	}

	componentDidMount(){
		this.computeTitle()
	}
	//创建菜单的函数
	createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item key={menuObj.key} onClick={()=>{this.saveTitle(menuObj.title)}}>
						<Link to={menuObj.path}>
							{<menuObj.icon/>}
							{menuObj.title}
							
						</Link>
					</Item>
				)
			}else{
				return(
					<SubMenu 
					key={menuObj.key} 
					icon={<menuObj.icon/>} 
					title={menuObj.title}
					>
						{this.createMenu(menuObj.children)}
					</SubMenu>
				)
			}
		})
	}

	render() {
		//选择的菜单  刷新还是之前选中的菜单
		const checkedKey = this.props.location.pathname.split('/').slice(-1)
		//选中下拉的菜单  刷新还是之前选中的菜单
		const openKey = this.props.location.pathname.split('/')
		return (
			<div className="left-nav">
				<div className="nav-top">
					<img src={logo} alt=""/>
					<span>商品管理系统</span>
				</div>
				<Menu
					defaultSelectedKeys={checkedKey} //默认选中哪个菜单
					defaultOpenKeys={openKey} //默认展开哪个菜单
					mode="inline" //菜单的模式
                    theme="dark" //主题颜色
                    >
					{this.createMenu(menus)}
				</Menu>
			</div>
		)
	}
}
export default LeftNav
