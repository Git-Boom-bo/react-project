#redux学习
##迷你版本：
1.yarn add redux安装redux
2.创建redux文件store.js和reducer.js
    //引入redux身上的creatStore  用来创建store             'import {createStore} from 'redux   
    //引入count的服务reducer                                import countReducer from './count-reducer'
    //用创建的store指定store所服务的reducer  然后暴露           export default createStore(countReducer)
    reducer.js文件里首先初始化状态 然后函数里边写判断
3.Count.jsx里引入store  调用store借助reducer写的逻辑   store.dispatch()
4.index.js中引入sotre  使用回调函数store.subscribe(()=>{  }     因为redux中保存的状态会发生改变