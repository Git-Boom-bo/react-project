import React, { Component } from 'react'
// import store from '../../redux/store'
// import {increment,decrement} from '../../redux/actions/count'

export default class Count extends Component {

	//加
	increment = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected
        this.props.increment(value*1)
	}

	//减
	decrement = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected
        this.props.decrement(value*1)

	}

	//当前的和是奇数再加
	incrementIfOdd = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected
		const {count} = this.props
		if(count % 2 === 1){
			this.props.increment(value*1)
			
		}
	}
	
	//定时器
	incrementAsync = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected		
		setTimeout(()=>{
			this.props.increment(value*1)
		},500)
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{this.props.count}</h1>
				<select ref="userSelected">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
				<button onClick={this.incrementAsync}>increment async</button>
			</div>
		)
	}
}