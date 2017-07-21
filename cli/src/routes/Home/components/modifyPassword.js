/**
 * Created by lilei on 2017/5/6.
 */
import React, {Component} from 'react'
// import moment from 'moment'
import {Modal, Button, AutoComsplete, Row, Col, Form, Input, Select, DatePicker, Radio, Icon, Checkbox,message} from 'antd';
const FormItem = Form.Item;
class ModifyPassword extends Component {
  constructor(props) {
    super(props)
  }
  handleSubmit(e) {
    var that = this
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) {
      }else{
        if(fieldsValue.newpassword == fieldsValue.oldpassword){
          message.error('新密码不能与旧密码一样')
        }else{
          if(fieldsValue.newpassword == fieldsValue.repeatPassword){
            this.props.onSave()
          }else{
            message.error('两次输入不一致，请再次输入！')
            console.log(2)
          }
        }
      }

    });
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    // console.log(this.props.visible)
    return (
      <Modal title="修改密码" className='modifyPassword' visible={this.props.visible}
             footer={null}   onCancel={()=>{this.props.showModifyPassword(false)}}
      >

        <Form
          layout='horizontal'
          onSubmit={(e)=>this.handleSubmit(e)}
        >
              <FormItem  {...formItemLayout}
                label="原密码"
              >
                {getFieldDecorator('oldpassword', {
                  initialValue: '',
                  rules: [{type: 'string',required: true,message: '输入不符合规定',min:6,max: 40}]
                })(
                  <Input  style={{ width: '200px' }}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="新密码"
              >

                {getFieldDecorator('newpassword', {
                  rules: [{type: 'string', required: true, message: '输入不符合规定!', min:6, max: 40,} ]
                })(
                  <Input style={{ width: '200px' }}/>
                )}
              </FormItem>
            <FormItem
              {...formItemLayout}
              label="再输一次"
            >
              {getFieldDecorator('repeatPassword', {initialValue: ''})(
                <Input style={{ width: '200px' }}/>
              )}
            </FormItem>
          <FormItem style={{textAlign: 'center'}}>
            <Button
                    type="ghost" onClick={()=>{this.props.showModifyPassword(false)}}>取消</Button>
            <Button style={{marginLeft: '20px'}} type="primary" htmlType="submit">保存</Button>
          </FormItem>
        </Form>

      </Modal>
    );
  }

}
export default Form.create()(ModifyPassword)
