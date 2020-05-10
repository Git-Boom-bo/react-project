import React, { Component } from 'react'
import {Button} from 'antd'
export default class AddUpdate extends Component {
    render() {
        return (
            <div>
                我用于：{this.props.match.params.id ? '修改':'增加'}
                <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
            </div>
        )
    }
}
