//reducer是个函数为count组件服务
//action是个对象  包括{type:'...',data:'...'}


let initState = 0 //初始化状态
export default function(preState = initState,action){
    //解构action对象里的key
    const {type,data} = action
    let newState
    switch (type) {
        case 'increment':
            //如果动作类型为加
            newState = preState +data
            return newState
        case 'decrement':
            //如果动作类型为减
            newState = preState -data
            return newState    
        default:
            //如果动作既不时间加也不是减 那就进入初始化状态
            return preState
    }
    
}