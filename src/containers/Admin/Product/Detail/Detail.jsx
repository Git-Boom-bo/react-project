import React, { Component } from 'react'
import {Card,Button,List,message} from 'antd'
import {connect} from 'react-redux'
import {saveCategoryAsync} from '@/redux/actions/category'
import { CaretLeftOutlined } from '@ant-design/icons'
import {reqProductInfoById} from '@/api'
import {IMAGE_BASE_URL} from '@/config'
import '@/containers/Admin/Product/Detail/css/detail.less'
const {Item} = List
@connect(
    (state)=>({categoryList:state.categoryList}),
    {saveCategoryAsync}
)
class Detail extends Component {
    state={
        currentProduct:{imgs:[]}//当前商品信息
    }
    //根据id获取商品数据
    getCurrentProductInfo= async (id)=>{
        let res = await reqProductInfoById(id)
        const {status,data,msg} = res
        if(status===0){
            this.setState({currentProduct:data})
        }else{
            message.error(msg)
        }
         
        
    }

    //根据分类id查找分类名称
    findCategoryName =(id)=>{
        let res = this.props.categoryList.find((categoryObj)=>{
            return categoryObj._id ===id
        })
        if(res) return res.name
    }
    componentDidMount(){
        //获取传递过来的id
        const {id} =this.props.match.params
        //发送请求查询id多对应商品
        this.getCurrentProductInfo(id)
        //尝试从redux中获取categoryList，有就用没有就请求
        if(this.props.categoryList.length ===0){
            this.props.saveCategoryAsync()
        }
    }
    render() {
        return (           
            <Card title={
                <div>
                    <Button
                        onClick={()=>{this.props.history.goBack()}}
                        type='link' >
                        <CaretLeftOutlined />返回
                    </Button>
                    <span>详情</span>
                </div>
            }>
            <List >
                <Item className='item'>
                    <span className='title'>商品名称:</span>
                    <span>{this.state.currentProduct.name}</span>
                </Item>
                <Item className='item'>
                    <span className='title'>商品描述:</span>
                    <span>{this.state.currentProduct.desc}</span>

                </Item>
                <Item className='item'>
                    <span className='title'>商品价格:</span>
                    <span>{'$' + this.state.currentProduct.price}</span>

                </Item>
                <Item className='item'>
                    <span className='title'>商品分类:</span>
                    <span>{this.findCategoryName(this.state.currentProduct.categoryId)}</span>

                </Item>
                <Item className='item'>
                    <span className='title'>商品图片:</span>
                    {
                        this.state.currentProduct.imgs.map((imgName)=>{
                            return <img key={imgName} src={IMAGE_BASE_URL+imgName} alt="product"/>
                        })
                    }

                </Item>
                <Item className='item'>
                    <span className='title'>商品详情:</span>
                    {/* 重点span便签要自结束   在react中innerHtml的替代方案是 dangerouslySetInnerHTML ={{__html:this.state.currentProduct.xxx*/}
                    <span dangerouslySetInnerHTML ={{__html:this.state.currentProduct.detail}}/>

                </Item>        
            </List>  
            </Card>            
        )
    }
}
export default Detail