const app = getApp()

Page({
  data: {
    version: '3.0.0'
  },

  onLoad() {
    console.log('首页加载')
  },

  goToMindMirror() {
    wx.switchTab({
      url: '/pages/webview/webview'
    })
  },

  onShareAppMessage() {
    return {
      title: '心镜 - 心理测评与成长训练',
      path: '/pages/index/index'
    }
  }
})