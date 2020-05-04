import {SAVE_USERINFO} from '../action_types'
export const saveUserInfo =(userObj)=>({type:SAVE_USERINFO,data:userObj})///主要这里用分别暴露（出错的地方）