//登陆
export const LOGIN_GET = 'LOGIN_GET'
export const LOGIN_GET_SUCCESS = 'LOGIN_GET_SUCCESS'
export function getLogin(result) {
  return {
    type: LOGIN_GET,

  }
}
export function getLoginSuccess(result) {
  return {
    type: LOGIN_GET_SUCCESS,
    result
  }
}
export function getLogins(opts, type) {
  return (dispatch, getState) => {
    dispatch(getLogin())
    var interFace = '/initToLoginMo';
    return axios.post(interFace, opts)
      .then(function (result) {
        dispatch(getLoginSuccess(result.data))
        sessionStorage.setItem("user", JSON.stringify(result.data.msg))
      }).catch(function (error) {
        console.error("URL: " + interFace + error)
      })
  }
}

