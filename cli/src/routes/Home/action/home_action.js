/* Created by zhy on 2017/5/02.*/
import NIM from '../../mixinsFunc/nim.js'
//退出登陆
export const LOGIN_OUT = 'LOGIN_OUT'
export const LOGIN_OUT_SUCCESS = 'LOGIN_OUT_SUCCESS'

//获取会话列表
export const LOGIN_GET_MESSAGE_OBJ = 'LOGIN_GET_MESSAGE_OBJ'
export function getMessageObj(result){
  return{
    type:LOGIN_GET_MESSAGE_OBJ,
    result
  }
}

export function getMessageObjSuc(data) {
  return (dispatch, getState) => {
    dispatch(getMessageObj(data))
  }
}
//连接SDK
export const LOGIN_CONNECT_SDK_SUC = 'LOGIN_CONNECT_SDK_SUC'
export function getConnectSdk(result){
  return{
    type:LOGIN_CONNECT_SDK_SUC,
    result
  }
}

export function getConnectSdkSuc(data) {
  return (dispatch, getState) => {
    dispatch(getConnectSdk(data))
  }
}
//获取自定义系统通知
export const LOGIN_CUSTOM_MESSAGE_SUC = 'LOGIN_CUSTOM_MESSAGE_SUC'
export function getCustomMessage(result){
  return{
    type:LOGIN_CUSTOM_MESSAGE_SUC,
    result
  }
}

export function getCustomMessageSuc(data) {
  return (dispatch, getState) => {
    dispatch(getCustomMessage(data))
  }
}

//退出登录
export function loginOut(result) {
  return {
    type: LOGIN_OUT,
  }
}
export function loginOutSuccess(result) {
  return {
    type: LOGIN_OUT_SUCCESS,
    result
  }
}
export function loginOuts(opts, type) {
  return (dispatch, getState) => {
    dispatch(loginOut())
    var interFace = '/json/logout';
    return axios.post(interFace, opts)
      .then(function (result) {
        dispatch(loginOutSuccess(result.data))
        Ewell.NIM.disconnect()
      }).catch(function (error) {
        console.error("URL: " + interFace + error)
      })
  }
}

//修改密码
export const MODIFY_PASSWORD = 'MODIFY_PASSWORD'
export function modifyPasswordType(result) {
  return {
    type: MODIFY_PASSWORD,
    result
  }
}
export function modifyPassword(opts, type) {
  return (dispatch, getState) => {
    dispatch(loginOut())
    var interFace = '/md5/user/updateUserpass';
    return axios.post(interFace, opts)
      .then(function (result) {
        dispatch(modifyPasswordType(result.data))
        console.log(result.data)
      }).catch(function (error) {
        console.error("URL: " + interFace + error)
      })
  }
}

/*
 * 我的名片
 */
export const HOME_MYCARD_GET = 'HOME_MYCARD_GET'
export function getMyCardType(result) {
  return {
    type: HOME_MYCARD_GET,
    result: result,
    loadingCard:true
  }
}
export function getMyCard(opts, type) {
  return (dispatch, getState) => {
    var interFace = "/md5/user/loginuserinfo";
    return axios.post(interFace, opts)
      .then(function (result) {
        dispatch(getMyCardType(result.data))
      }).catch(function (error) {
        console.error("URL: " + interFace + error)
        return error
      })
  }
}
/*
 * 获取登录用户所属团队及成员信息
 */
export const HOME_USERGROUP_GET = 'HOME_USERGROUP_GET'
export function getUserGroupType(result) {
  return {
    type: HOME_USERGROUP_GET,
    result: result
  }
}
export function getUserGroup(opts, type) {
  return (dispatch, getState) => {
    var interFace = "/md5/consultGroup/getUserGroup";
    return axios.post(interFace, opts)
      .then(function (result) {
        dispatch(getUserGroupType(result.data))
      }).catch(function (error) {
        console.error("URL: " + interFace + error)
        return error
      })
  }
}
