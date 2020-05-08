import React, { Component } from 'react'
import {Card,Button,Table,Modal,Form,Input} from 'antd'
import {connect} from 'react-redux'
import {reqList} from '@/api'
import {PlusCircleOutlined} from '@ant-design/icons';
import {saveCategory} from '@/redux/actions/category'

const {Item} = Form
@connect(
    (state)=>({categoryList:state.categoryList}),
    {saveCategory}
)
class Category extends Component {
    //默认不展示弹窗
    state = { visible: false };
    //展示弹窗
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = () => {
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = () => {
      this.setState({
        visible: false,
      });
    };
   getCategryList = async()=>{
       let res = await reqList()
       const {status,data} = res
       if(status===0){
           this.props.saveCategory(data)
       }
   }

    componentDidMount(){
        this.getCategryList()
    }
    render() {
        //表格数据源
        const dataSource = this.props.categoryList
          //表格列配置
          const columns = [
            {
              title: '分类名',//列命
              dataIndex: 'name',//数据索引
              key: 'name',//key最好保留 唯一的key
            },
            {
              title: '操作',
              width:'20%',
              align:'center',
              render:()=>{
                  return <Button type='link'>修改分类</Button>
              },
              key: 'age',
            },

          ];
        return (
            <div>
                <Card extra=
                {<Button onClick={this.showModal} 
                type='primary'>
                <PlusCircleOutlined />添加
                </Button>}>
                <Table 
                dataSource={dataSource}//配置数据源
                columns={columns} //配置列
                bordered={true}//显示边框
                rowKey="_id" //配置唯一标识,不找key了去找_id
                pagination={{ //分页器
                    pageSize:8 //每页展示多少条
                }} 
                 />
                </Card>
                <Modal
                title="新增分类"
                visible={this.state.visible} //控制弹窗是否展示
                onOk={this.handleOk}//确认的回调
                onCancel={this.handleCancel}//取消的回调
                okText='确定'
                cancelText='取消'
                >
                <Form>
                    <Item
                        name='category'
                        rules={[
                            {required:true,message:'分类名必须输入'}
                        ]} 
                    >
                        <Input placeholder='请输入分类名'></Input>
                    </Item>
                </Form>
                </Modal>
            </div>
        )
    }
}
export default Category
