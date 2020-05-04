//管理动作对象的数据  这里用的分别暴露
import {INCREMENT,DECREMENT} from '../action-types'
export const increment = (value)=>{

    return {type:INCREMENT,data : value}
}
export const decrement = (value)=>{
    
    return {type:DECREMENT,data : value}
}