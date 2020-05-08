import {SAVE_CATEGORY} from '@/redux/action_types'
//保存标题的action       同步
export const saveCategory = (categoryArr) =>({type:SAVE_CATEGORY,data:categoryArr})