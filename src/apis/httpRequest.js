import {getStorageSync, hideLoading, showLoading, showNotify} from '../utils/index'

var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()
// 设置超时
fly.config.timeout = 7000

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  const token = getStorageSync('token')
  request.headers['token'] = token
  return request
})

/**
 * request服务封装
 */
export default {
  sendRequest
}

function sendRequest () {
  return {
    _sucCallback: null,
    _failCallback: null,
    _method: 'GET',
    _data: {},
    _header: {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    _url: '',
    send: function () {
      showLoading({
        title: '加载中...'
      })

      fly.request(this._url, this._data, {
        method: this._method,
        headers: this._header
      })
        .then(res => {
          hideLoading()
          let error = httpHandlerError(res, this._failCallback)
          if (error) return
          this._sucCallback(res)
        })
        .catch((res) => {
          hideLoading()
          httpHandlerError(res, this._failCallback)
        })

      return this
    },
    success: function (callback) {
      this._sucCallback = callback
      return this
    },
    fail: function (callback) {
      this._failCallback = callback
      return this
    },
    url: function (url) {
      this._url = url
      return this
    },
    data: function (data) {
      this._data = data
      return this
    },
    method: function (method) {
      this._method = method
      return this
    },
    header: function (header) {
      this._header = header
      return this
    }
  }
}

/**
 * info 请求完成后返回信息
 * callBack 回调函数
 * errTip 自定义错误信息
 */
function httpHandlerError (info, callBack) {
  hideLoading()
  /** 请求成功，退出该函数 可以根据项目需求来判断是否请求成功。这里判断的是status为200的时候是成功 */
  let haveError = true
  let errTip
  if (info.status === 200) {
    if (info.data.code === undefined) {
      haveError = true
    } else if (info.data.code === 'success' || info.data.code === 0) {
      haveError = false
    } else {
      haveError = true
      errTip = info.data.msg
    }
  } else {
    errTip = '网络请求出现了错误【' + info.status + '】'
    haveError = true
  }

  if (haveError) {
    /** 发生错误信息时，如果有回调函数，则执行回调 */
    if (callBack) {
      callBack(info)
    } else {
      showNotify(errTip)
    }
  }
  return haveError
}
