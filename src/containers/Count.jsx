//容器组件
//引入UI组件
import Count from '../components/Count'
//引入react-redux中的connect方法
import {connect} from 'react-redux'
//引入动作action
import {increment,decrement} from '../redux/actions/count'

/*
1.connect()的返回值是一个函数
2.connect()()的返回值是一个容器组件
3.connect这样使用：connect(状态，操作状态的方法)(UI组件)
*/
function mapStateToProps(state){
    return {count:state}
}

function mapDispatchToProps(dispatch){
    return {
        increment:(value)=>{dispatch(increment(value))},
        decrement:(value)=>{dispatch(decrement(value))}

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Count)