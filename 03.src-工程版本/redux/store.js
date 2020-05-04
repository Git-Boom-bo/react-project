//引入redux身上的creatStore  用来创建store
import {createStore} from 'redux'
//引入count的服务reducer
import countReducer from './reducers/count'
//用创建的store指定store所服务的reducer  然后暴露
export default createStore(countReducer)
