import {SAVE_USERINFO} from '../action_types'

let initState = {user:{},token:''}//初始化状态
export default function(preState =initState ,action){
    const {type,data} = action
    let newState //定义新状态
    switch (type) {
        case SAVE_USERINFO:
            newState ={...data}
            return newState
        default:
            return preState
    }
}