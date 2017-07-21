/*Created by lilei on 2016/11/3.
 */
import axios from 'axios'
import qs from 'qs'
import pkage from 'pkgconfig'

function isJson(obj) {
  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
}
var translateJson = function (opts) {
  var newJson = {}
  for (var o in opts) {
    if (!isJson(opts[o])) {
      newJson[o] = opts[o]
    } else {
      for (var p in opts[o]) {
        newJson[o + "." + p] = opts[o][p]
      }
    }
  }
  return newJson;
}
/**
 * 功能：axios 基础配置
 * 返回：配置好的增强版本 axios
 * */
window.baseUrl = pkage.axios
//axios.defaults.headers.post['Content-Type'] = 'application/json';

var instance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  transformRequest: [function (data) {
    data = translateJson(data || {})
    //秘书状态
    Object.assign(data, {
      UUID: Ewell.user.userCode
    })
    return qs.stringify(data);
  }],
  transformResponse: [function (data) {
    try {
      var json = JSON.parse(data)
      const str = json.msg != null ? json.msg.substring(0, 1) : '[]'
      if (json.msg != "" && (str === '[' || str === '{')) {
        json.msg = JSON.parse(json.msg)
      }
      return json
    } catch (err) {
      console.error(err)
    }
  }]
})
//添加拦截器，
instance.interceptors.response.use((result)=> {
  return result
}, (thrown)=> {
  if (axios.isCancel(thrown)) {
    console.warn('Request canceled', thrown.message);
    return Promise.reject("请求被阻断");
  }
  return Promise.reject(thrown);
})

module.exports = {
  post: function (url, opts) {
    var CancelToken = axios.CancelToken;
    var token = new CancelToken(function executor(c) {
      Ewell.sources.push(c)
    })
    return instance.post(url, {
      ...opts
    }, {
      cancelToken: token
    })
  },
  get: function (url, opts) {
    var CancelToken = axios.CancelToken;
    var token = new CancelToken(function executor(c) {
      Ewell.sources.push(c)
    })
    return instance.get(url, {
      params: {
        ...opts
      },
      cancelToken: token
    })
  },
  all: axios.all,
  spread: axios.spread
}
