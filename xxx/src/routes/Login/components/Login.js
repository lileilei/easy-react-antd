/**
 * Created by czh on 2016/11/16.
 */
import React, {Component, PropTypes} from 'react'
import {connect,} from 'react-redux'
import {Link, browserHistory,} from 'react-router'
import {Modal, Form, Input, Button, Icon, Select, DatePicker, Radio, message,} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

var crypto = require('crypto');
import user from '../assets/i-login-user.png'
import pwd from '../assets/i-login-pwd.png'

var timer = null

import './style.less'
class FormArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:"登录"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

//提交登录信息
  handleSubmit(e) {
    var timer = null
    e.preventDefault();
    var that = this
    that.setState({
      value:"登录中 . . ."
    })
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) {
        return
      } else {
        this.props.getLogins({user_name: fieldsValue.name, password: fieldsValue.secret, timeout: 2592000,})
          .then(function () {
            const {login} = that.props.login
            if (login.type == 'success') {
              var msg = login.msg
              msg.logining = true
              // localStorage.setItem('info',JSON.stringify(msg))
              Ewell.user = msg
              timer = setInterval(function () {
                if (Ewell.user) {
                  var url = '/mdt/home'
                  browserHistory.push(url)
                  clearInterval(timer)
                }
              }, 300)
            } else {
              message.error(login.message)
              that.setState({
                value:"登录"
              })
            }
          })
      }

    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout1 = {
      wrapperCol: {span: 24}
    }

    return (
      <div className="login">
        <div className="img"></div>
        <h3 className="titles">多学科联合会诊平台</h3>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit} style={{width:'300px'}}>

          <FormItem {...formItemLayout1}>
            {getFieldDecorator('name', {initialValue: ''})(
              <Input style={{width:'300px',}}
                     placeholder="请输入账号"
                     prefix={<img src={user} alt=""/>}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout1}>
            {getFieldDecorator('secret',
              {
                rules: [{type: 'string', required: true, message: '输入不符合规定!', min: 4, max: 16, pattern: /^[0-9]*$/}],
                initialValue: ''
              })(
              <Input type="password" style={{width:'300px',}}
                     placeholder="请输入密码4~16位数字"
                     prefix={<img src={pwd} alt="" type="password"/>}
              />
            )}
          </FormItem>
          <FormItem{...formItemLayout1} >
            <button type="submit">{this.state.value}</button>
          </FormItem>

        </Form>
      </div>

    )
  }
}
FormArea = Form.create({})(FormArea)
export default FormArea


