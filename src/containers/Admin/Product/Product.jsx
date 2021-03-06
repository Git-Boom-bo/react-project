import React, { Component } from 'react'
import { Card,Button,Select,Input,Table, message } from 'antd'
import {PlusCircleOutlined} from '@ant-design/icons'
import {reqProductList,reqSearchProduct,reqUpdataProductStatus} from '@/api'
import {PAGE_SIZE} from '@/config'

const {Option} =Select

export default class Product extends Component {
    state={
        productList:[],//商品数据
        total:0,//初始数据总数
        pageNum:0,//当前是第几页
        searchType:'productName',//搜索方式默认是按名称搜索 
        keyWord:'',//搜索的关键字
        isLoding:false,
    }
    
    //更改商品上架、下架
    changeStatus= async (_id,currentStatus)=>{
        if(currentStatus === 1) currentStatus =2
        else currentStatus = 1
        let res = await reqUpdataProductStatus(_id,currentStatus)
        const {status,msg} = res
        if(status ===0){
            message.success(currentStatus === 1 ? '上架成功':'下架成功')
            this.getProductList(this.state.pageNum)
        }else{
            message.error(msg)
        }
    }

    getProductList= async(pageNub=1)=>{
        let res
        this.setState({isLoding:true})
        if(this.isSearch){        
            const {searchType,keyWord} =this.state
            res = await reqSearchProduct(pageNub,PAGE_SIZE,searchType,keyWord)
        }else{
            res = await reqProductList(pageNub,PAGE_SIZE)

        }
        const {status,data,msg} = res
        if(status===0){
            const {list,total,pageNum}=data
            this.setState({productList:list,total,pageNum,isLoding:false})
        }else{
            message.error(msg)
        }
    }
    componentDidMount(){
        this.getProductList()
    }
    render() {
        const dataSource = this.state.productList
          
        const columns = [
            {
              title: '商品价格',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render:(price)=>{return '$'+price}
              }, 
              {
                title: '状态',
                // dataIndex: 'status',
                key: 'status',
                align:'center',
                render:(productObj)=>{
                    const {_id,status} =productObj
                    return (
                        <div>
                           <Button onClick={()=>{this.changeStatus(_id,status)}} type={status ===1? 'danger':'primary'} >
                               {status===1? '下架' : '上架'}
                           </Button><br/>
                            <span>{status===1?'在售':'售空'}</span> 
                        </div>
                    )
                }
              }, 
              {
                title: '操作',
                dataIndex: '_id', 
                key: 'action',
                align:'center',
                render:(id)=>(
                    <div>
						<Button 
							onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${id}`)}} 
							type="link"
						>详情
						</Button><br/>
						<Button 
							onClick={()=>{this.props.history.push(`/admin/prod_about/product/update/${id}`)}}
							type="link"
						>修改
						</Button>
					</div>
                )          
              },
          ];


        return (
            <Card title={
                <div>
                    <Select onChange={(value)=>{this.setState({searchType:value})}} defaultValue='productName'>
                        <Option value='productName'>按照名称搜索</Option>
                        <Option value='productDesc'>按照描述搜索</Option>
                    </Select>
                    <Input onChange={(event)=>{this.setState({keyWord:event.target.value})}} allowClear={true} style={{width:'20%',margin:'10px'}} placeholder='请输入关键字'/>
                    <Button 
                    onClick={()=>{
                        this.isSearch =true
                        this.getProductList()
                    }} 
                    type='primary'
                    >搜索
                    </Button>
                </div>
            } 
            extra={
            <Button onClick={()=>{this.props.history.push('/admin/prod_about/product/add')}} type='primary'>
                <PlusCircleOutlined/>添加
            </Button>}>
            <Table 
            isLoding={false}
            dataSource={dataSource} 
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{
                total:this.state.total,//数据总数
                pageSize:PAGE_SIZE,//每页数
                current:this.state.pageNum,
                onChange:(productNub)=>{
                    this.getProductList(productNub)
                }
            }}
             />
            </Card>
        )
    }
}
