import {List, fromJS} from 'immutable'
import {
  LOGIN_GET,LOGIN_GET_SUCCESS
} from './action'
const ACTION_HANDLERS = {
  //登录
  [LOGIN_GET]: (state, action) => (
    state.merge({...state,})
  ),
  [LOGIN_GET_SUCCESS]: (state, action) => (
    state.merge({
      ...state,
      login:action.result
    })
  ),

}

const initialState = fromJS({
  login:{}
})
export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
