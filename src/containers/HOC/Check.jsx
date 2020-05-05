//这个组件是高阶组件 用于检测传递过来的组件
//检测规则：1.如果没有登录，但是要看是非login，不允许。
        //2.如果已经登录，但是要看的是login，不允许。
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


export default  function (GetComponent){
    @connect(
        (state)=>({isLogin:state.userInfo.isLogin}),
        {}
    )
    class TargetComponetn extends Component{
        
        render(){
            const {isLogin} = this.props
            const {pathname} =this.props.location
            if(!isLogin&&pathname !=='/login') return <Redirect to ='/login'/>
            if(isLogin&&pathname ==='/login') return <Redirect to ='/admin'/>

            return <GetComponent {...this.props}/>
        }
    }
    return TargetComponetn
    
}