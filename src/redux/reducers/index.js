//用于合并reducers
import {combineReducers} from 'redux'
//引入loginReducer
import loginReducer from './login'

export default combineReducers({
    userInfo:loginReducer
})