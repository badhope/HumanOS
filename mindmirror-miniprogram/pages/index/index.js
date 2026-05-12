const app = getApp()

Page({
  data: {
    version: '3.0.0',
    showFeatures: false
  },

  onLoad() {
    console.log('首页加载')
    this.startAnimation()
  },

  onShow() {
    console.log('首页显示')
  },

  onReady() {
    console.log('首页渲染完成')
  },

  startAnimation() {
    setTimeout(() => {
      this.setData({ showFeatures: true })
    }, 300)
  },

  goToMindMirror() {
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    
    setTimeout(() => {
      wx.hideLoading()
      wx.switchTab({
        url: '/pages/webview/webview'
      })
    }, 500)
  },

  onShareAppMessage() {
    return {
      title: '心镜 - 心理测评与成长训练',
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: '心镜 - 探索内心，发现更好的自己',
      query: ''
    }
  }
})