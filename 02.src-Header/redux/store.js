//引入创建store  引入应用中间件
import {createStore,applyMiddleware} from 'redux'
//引入thunk用于异步action
import thunk from 'redux-thunk'
//引入composeWithDevTools支持开发者工具使用
import {composeWithDevTools} from 'redux-devtools-extension'
//引入reducer
import allReducer from './reducers'

export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))