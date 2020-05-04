import React, { Component } from 'react'
import store from '../../redux/store'
import {increment,decrement} from '../../redux/actions/count'


export default class Count extends Component {

	//加
	increment = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected
        //2.调用store里面定义好的逻辑  方法为store.dispatch()
                                    //*1相当于转化成数字类型
        store.dispatch(increment(value*1))
	}

	//减
	decrement = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected
        store.dispatch(decrement(value))
		// store.dispatch({type:'decrement',data:value*1})
	}

	//当前的和是奇数再加
	incrementIfOdd = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected
		//2.得到当前的和  然后进行判断
        let count = store.getState()
        if(count % 2 === 1){
        store.dispatch(increment(value*1))
		// store.dispatch({type:'increment',data:value*1})
		}
	}
	
	//定时器
	incrementAsync = ()=>{
		//1.获取用户的输入
		const {value} = this.refs.userSelected		
		setTimeout(()=>{
			store.dispatch(increment(value*1))

			// store.dispatch({type:'increment',data:value*1})
		},500)
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{store.getState()}</h1>
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
