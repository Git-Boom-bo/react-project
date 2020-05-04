import React, { Component } from 'react'
import Admin from './containers/Admin/Admin'
import Login from './containers/Login/Login'
import {Switch,Route,Redirect} from 'react-router-dom'
export default class App extends Component {
    render() {
        return (
            
               <Switch>
                   <Route path='/login' component={Login}></Route>
                   <Route path='/admin' component={Admin}></Route>
                   <Redirect to='/login'/>
               </Switch>
            
        )
    }
}
