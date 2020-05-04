import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'
let _user 
try {
    _user= JSON.parse(localStorage.getItem('user'))
}catch{
    _user =null
}
let _token = localStorage.getItem('token')
let initState = {
    user:_user||{},
    token:_token||'',
    isLogin: _user && _token ?true:false
}//初始化状态


export default function(preState =initState ,action){
    const {type,data} = action
    let newState //定义新状态
    switch (type) {
        case SAVE_USERINFO:
            newState ={...data,isLogin:true}
            return newState
        case DELETE_USERINFO:
            newState ={user:{},token:'',isLogin:false}
            return newState
        default:
            return preState
    }
}