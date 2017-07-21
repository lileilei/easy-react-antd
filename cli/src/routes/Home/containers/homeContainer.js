/* Created by zhy on 2017/5/02.*/
import React, {Component} from 'react'
import {browserHistory, Link} from 'react-router'
import {connect} from 'react-redux'
import {Layout, Menu, Icon, Modal, Spin, message} from 'antd';
import './homeView.less'
import './globel.less'
import NIM from '../../mixinsFunc/nim.js'
import pkage from 'pkgconfig'
import ModifyPassword from '../components/modifyPassword'
import suc from  '../assets/tk_suc.png'
import {
  loginOuts,
  getMyCard,
  getUserGroup,
  modifyPassword,
  getMessageObjSuc,
  getConnectSdkSuc,
  getCustomMessageSuc
} from '../action/home_action'
@NIM class HomeView extends Component {
  constructor(props) {
    super(props)
    this.resize = this.resize.bind(this)
    this.showModifyPassword = this.showModifyPassword.bind(this)
    this.onSave = this.onSave.bind(this)
    this.cancelMessage = this.cancelMessage.bind(this)
    this.goMessage = this.goMessage.bind(this)
    this.state = {
      current: 'homePage',
      minHeight: "",
      contentH: '',
      MenuState: "login-info",
      visible: false,
      passVisible: false,
      myCard: {},
      userGroup: [],
      showModal: false
    }
  }

  resize() {
    this.setState({
      minHeight: document.body.offsetHeight - 64,
      contentH: document.getElementsByClassName("content")[0].offsetHeight
    })
  }

  componentWillUnmount() {
    if (localStorage.getItem('info')) {
      localStorage.setItem('info', '')
    }
  }

  componentWillMount(){
    if(Ewell.user.accid && Ewell.user.acctoken){
      this.getNimInstance()
    }
  }

  componentDidMount() {
    var that = this
    this.resize()
    Ewell.resizeFunc.push(this.resize)
  }

  //菜单切换
  handleSelect = (value) => {
    const url = "/mdt/home/" + value.key
    browserHistory.push({pathname: url, state: {key: value.key}})
    this.setState({
      current: value.key
    })
  }
  //打开关闭菜单
  openMenu() {
    var state = ""
    if (this.state.MenuState == "login-info") {
      state = "login-info open"
    } else {
      state = "login-info"
    }
    this.setState({
      MenuState: state
    })
  }

  handleCancel() {
    this.setState({
      visible: false
    })
  }

//退出登录
  checkout(e) {
    var that = this
    this.props.loginOuts()
      .then(function () {
        const {logins} = that.props.home
        if (logins.type == 'success') {
          message.success(logins.message)
          const url = '/mdt/login'
          window.location.href = url
        } else {
          message.error(logins.message)
        }
      })
  }


  //我的名片
  showInfo() {
    var params = {userCode: Ewell.user.userCode}
    this.setState({
      visible: true
    })
    axios.all([this.props.getMyCard(params), this.props.getUserGroup(params)]).then(axios.spread((err, err2)=> {
      this.setState({
        myCard: this.props.home.myCard,
        userGroup: this.props.home.userGroup
      })
    }))
  }

//修改密码
  showModifyPassword(val) {
    this.setState({
      passVisible: val
    })
  }

  //保存密码
  onSave() {
    var that = this
    var formValue = this.refs['changpwd'].getFieldsValue();
    this.props.modifyPassword({oldpassword: formValue.oldpassword, newpassword: formValue.newpassword})
      .then(function () {
        const {loginSuccess} = that.props.home
        if (loginSuccess.type == 'success') {
          message.success('密码修改成功')
          that.setState({
            passVisible: false
          })
        } else {
          message.error(loginSuccess.message)
        }
      })
  }

  /*************************暂无消息相关***********************/
  goMessage(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    else {
      window.event.returnValue = false;
    }
    this.setState({showModal: true})
  }

  cancelMessage() {
    this.setState({showModal: false})
  }

  /*************************暂无消息相关***********************/



  render() {
    const {userGroup,myCard,sessionsState,customMessage,loadingCard} = this.props.home
    return (
      <div id="home">
        <Modal visible={this.state.visible} width='724px'
               footer={null} onCancel={()=>this.handleCancel()}>
         <Spin spinning={!loadingCard}>
          <div id="userInfo">
            <div className="friend">
              <div className="tx">
                <img onError={(e)=>{e.target.src=require("../../assets/test/tx.jpg")}}
                     src={pkage.imgServer+'download?filePath='+ myCard.userAvr}/>
              </div>
              <p className="name">{this.state.myCard.nickName}</p>

              <div className="nr">
                <h4>简介</h4>

                <p>{this.state.myCard.introduce}</p>
                {
                  this.state.userGroup.map((item, i)=> {
                    return (
                      <div key={i} className="group-title">
                        <h4>{item.name}</h4>

                        <div className="z_ys clearfix">
                          {
                            item.userList.map((child, j)=> {
                              return (
                                <a href="#" key={j}>
                                  <img onError={(e)=>{e.target.src=require("../../assets/test/tx.jpg")}}
                                       src={pkage.imgServer+'download?filePath='+child.userAvr}/>
                                  <p className="z_ys_name">{child.name}</p>
                                  <h4 className="z_ys_zw">{child.mark}</h4>
                                </a>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
                <h4>擅长</h4>
                <p>{this.state.myCard.skill}</p>
              </div>
            </div>
          </div>
         </Spin>
        </Modal>
        <Modal visible={this.state.showModal}
               footer={null} onCancel={()=>this.cancelMessage()}
          >
          <div id="goMessage">
            <p>{'敬 请 期 待 !'}</p>
          </div>
        </Modal>

        <div className="header">
          <div className="hd-l">
            <div className="logo"><i></i>多学科联合会诊</div>
          </div>
          <div className="hd-r">
            <div className={this.state.MenuState}>
              <a onClick={()=>this.openMenu()} href="javascript:void(0)" data-toggle="dropdown" role="button"
                 aria-haspopup="true"
                 aria-expanded="true">
                <img src={pkage.imgServer+'download?filePath='+Ewell.user.userAvr}
                     onError={(e)=>{e.target.src=require("../../assets/test/tx.jpg")}}
                                           alt=""/>{Ewell.user.nickName}<i
                className="i-angle-white am-ml-5"></i></a>
              <ul className="am-dropdown">
                <li><a onClick={()=>this.showInfo()} href="javascript:"><img
                  src={require("../../assets/account_mymp.svg")}/>我的名片</a></li>
                <li><a onClick={()=>this.showModifyPassword(true)} href="javascript:"><img
                  src={require("../../assets/account_editpas.svg")}/>修改密码</a></li>
                <li><a href="javascript:" onClick={(e)=>this.checkout(e)}><img
                  src={require("../../assets/account_exit.svg")}/>退出</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="content" id="content">
          <div className="page-lside">
            <ul className="lside-menu-min">
              <li><Link to="/mdt/home/homePage" activeClassName="active"><img
                src={require("../../assets/i-menu-home.svg")}/>首页</Link></li>
              <li><Link to="/mdt/home/meeting" activeClassName="active"><img
                src={require("../../assets/i-menu-hz.svg")}/>会诊</Link>
              </li>
               <li><Link to="/mdt/home/auxiliary" activeClassName="active"><img
                src={require("../../assets/i-menu-fz.svg")}/>辅诊</Link>
              </li>
              <li><Link to="/mdt/home/patient" activeClassName="active"><img
                src={require("../../assets/i-menu-patient.svg")}/>患者</Link></li>
              <li><a onClick={e =>this.goMessage(e)}><img
                src={require("../../assets/i-menu-message.svg")}/>消息</a></li>
              <li><Link to="/mdt/home/data" activeClassName="active"><img
                src={require("../../assets/i-menu-data.svg")}/>数据</Link>
              </li>
            </ul>
          </div>
          <div className="page-rcont">
            {this.props.children}
          </div>
        </div>
        <ModifyPassword ref="changpwd"
                        visible={this.state.passVisible}
                        showModifyPassword={this.showModifyPassword}
                        onSave={this.onSave}
          >
        </ModifyPassword>
      </div>
    )
  }
}
const mapDispatchtoProps = {
  loginOuts,
  getMyCard,
  getUserGroup,
  modifyPassword,
  getMessageObjSuc,
  getConnectSdkSuc,
  getCustomMessageSuc
}
const mapStateToProps = (state) => {
  return {
    home: state.get('home').toJS()
  }
}
export default connect(mapStateToProps, mapDispatchtoProps)(HomeView)
