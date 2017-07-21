/* Created by zhy on 2017/5/02.*/
import {fromJS} from 'immutable'
import {
  LOGIN_OUT,LOGIN_OUT_SUCCESS, HOME_MYCARD_GET, HOME_USERGROUP_GET,
  MODIFY_PASSWORD,LOGIN_GET_MESSAGE_OBJ,LOGIN_CONNECT_SDK_SUC,LOGIN_CUSTOM_MESSAGE_SUC
} from '../action/home_action'
const ACTION_HANDLERS = {
  [LOGIN_OUT]: (state, action) => (
    state.merge({...state})
  ),
  [LOGIN_OUT_SUCCESS]: (state, action) => (
    state.merge({...state, logins: action.result})
  ),
  [HOME_MYCARD_GET]: (state, action) => (
    state.merge({...state, myCard: action.result.msg,loadingCard:action.loadingCard})
  ),
  [HOME_USERGROUP_GET]: (state, action) => (
    state.merge({...state, userGroup: action.result.msg})
  ),
  [LOGIN_GET_MESSAGE_OBJ]: (state, action) => (
    state.merge({...state, sessionsState: action.result})
  ),
  [LOGIN_CONNECT_SDK_SUC]: (state, action) => (
    state.merge({...state, connectSuc: action.result})
  ),
  [LOGIN_CUSTOM_MESSAGE_SUC]: (state, action) => (
    state.merge({...state, customMessage: action.result})
  ),
  [MODIFY_PASSWORD]: (state, action) => (
    state.merge({
      ...state,
      loginSuccess: action.result
    })
  ),
}

const initialState = fromJS({
  loginSuccess: {},
  fetching: false,
  logins: '',
  myCard: {},
  userGroup: [],
  modifyPassword: '',
  sessionsState: {},
  connectSuc:false,
  customMessage:[],
  loadingCard:false
})
export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

















