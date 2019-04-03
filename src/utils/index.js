import Notify from 'vant-weapp/dist/notify/notify'

/**
 * 显示顶部红色通知
 * 使用方法：调用时确保界面上有：
 * <van-notify id="van-notify"/>
 * @param msg
 * @param showTime
 */
export function showNotify (msg, showTime) {
  if (!showTime) {
    showTime = 3000
  }
  Notify({
    text: msg,
    duration: showTime
  })
}

/**
 * 从缓存里获取数据
 * @param key
 * @return value
 */
export function getStorageSync (key) {
  return wx.getStorageSync(key)
}

/**
 * 显示加载中
 * @param data
 */
export function showLoading (data) {
  wx.showLoading(data)
}

/**
 * 隐藏加载中
 */
export function hideLoading () {
  wx.hideLoading()
}

/**
 * 将数据保存到缓存
 * @param key
 * @param value
 */
export function setStorageSync (key, value) {
  wx.setStorageSync(key, value)
}

export default {
  getStorageSync,
  setStorageSync,
  showLoading,
  hideLoading,
  showNotify
}
