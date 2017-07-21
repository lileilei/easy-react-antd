/** Created by lilei on 2017/5/3.*/
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getLogins} from './action'
import {Tabs, Button, Radio, Input} from 'antd';
import './style.less'
import Login from './components/Login'
const TabPane = Tabs.TabPane
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.resize = this.resize.bind(this)
    this.state = {
      minHeight: 0,
    }
  }

  resize() {
    this.setState({
      minHeight: document.body.offsetHeight
    })
  }

  componentDidMount() {

    this.resize()
    Ewell.resizeFunc.push(this.resize)
  }

  componentWillUnmount() {
    Ewell.clearResize()
  }
  render() {
    return (
      <div id="login" style={{minHeight:this.state.minHeight }}>
        <Login
          getLogins={this.props.getLogins}
          login={this.props.login}
        >
        </Login>
      </div>
    )
  }
}
const mapDispatchtoProps = {
  getLogins,
}
const mapStateToProps = (state) => {
  return {
    login: state.get('login').toJS()
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(LoginContainer)
