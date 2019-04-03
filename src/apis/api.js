import requestService from './httpRequest'

const PROD_SERVICE = 'https://我的线上产品域名/lawyer-card-service'
const DEV_SERVICE = 'http://baike.baidu.com/api'

/**
 * 根据开发环境返回接口url
 * @returns {string}
 */
function getSerive () {
  if (process.env.NODE_ENV === 'production') {
    return PROD_SERVICE
  } else {
    return DEV_SERVICE
  }
}

/** wx.request服务封装 */
export default {

  /**
   * 测试的请求
   * @param data
   * @param callBack
   */
  demoAjax (data, callBack, failCallBack) {
    requestService.sendRequest().url(getSerive() + '/openapi/BaikeLemmaCardApi').method('GET').data(data).success(res => {
      callBack(res)
    }).fail(res => {
      failCallBack(res)
    }).send()
  }
}
