import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'
//创建保存的用户信息
export const saveUserInfo =(userObj)=>{
    //向localStorage中保存当前登录的信息
    const {user,token} = userObj
    //localStorage中保存的数据都是key，value组合  key和value都是字符串
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)

   return {type:SAVE_USERINFO,data:userObj}
}///主要这里用分别暴露（出错的地方）

//创建删除的用户信息
export const deleteUserInfo=()=>{
    //清除localStorage中保存的用户信息
    localStorage.clear()
    return {type:DELETE_USERINFO}
}