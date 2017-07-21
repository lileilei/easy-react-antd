/**
 * Created by Administrator on 2017/6/30 0030.
 */
  //接受邀请
export const RECEIVE_INVITE_SUCCESS = 'RECEIVE_INVITE_SUCCESS'
export function receiveInviteSuccess(result) {
  return {
    type: RECEIVE_INVITE_SUCCESS,
    result
  }
}
export function receiveInvite(opts, type) {
  return (dispatch, getState) => {
    var interFace = '/md5/consult/updateBusinessType';
    return axios.post(interFace, opts)
      .then(function (result) {
        dispatch(receiveInviteSuccess(result.data))
      }).catch(function (error) {
        console.error("URL: " + interFace + error)
      })
  }
}
//拒绝邀请
export const REFUSE_INVITE_SUCCESS = 'REFUSE_INVITE_SUCCESS'
export function refuseInviteSuccess(result) {
  return {
    type: REFUSE_INVITE_SUCCESS,
    result
  }
}
export function refuseInvite(opts, type) {
  return (dispatch, getState) => {
    var interFace = '/md5/consult/refusetempconsult';
    return axios.post(interFace, opts)
      .then(function (result) {
        dispatch(refuseInviteSuccess(result.data))
      }).catch(function (error) {
        console.error("URL: " + interFace + error)
      })
  }
}
