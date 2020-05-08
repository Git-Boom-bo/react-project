//用于合并reducers
import {combineReducers} from 'redux'
//引入loginReducer
import loginReducer from './login'
//引入titleReducer
import titleReducer from './title'
//引入categoryReducer
import categoryReducer from './category'
export default combineReducers({
    userInfo:loginReducer,
    title:titleReducer,
    categoryList:categoryReducer
})