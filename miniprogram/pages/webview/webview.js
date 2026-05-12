const app = getApp()

Page({
  data: {
    url: ''
  },

  onLoad(options) {
    let baseUrl = app.globalData.webUrl

    if (options.path) {
      baseUrl = baseUrl + options.path
    }

    if (options.scene) {
      baseUrl = baseUrl + '?scene=' + options.scene
    }

    this.setData({ url: baseUrl })
  },

  onShow() {
    if (!this.data.url) {
      this.setData({ url: app.globalData.webUrl })
    }
  },

  onMessage(e) {
    const data = e.detail.data
    if (data && data.length > 0) {
      const msg = data[data.length - 1]
      if (msg.action === 'share') {
        this.shareData = msg.data
      }
      if (msg.action === 'setTitle') {
        wx.setNavigationBarTitle({ title: msg.title || '心镜' })
      }
    }
  },

  onLoadSuccess() {
    wx.hideLoading()
  },

  onError() {
    wx.showModal({
      title: '加载失败',
      content: '网络连接异常，请检查网络后重试',
      confirmText: '重试',
      success: (res) => {
        if (res.confirm) {
          this.setData({ url: app.globalData.webUrl })
        }
      }
    })
  },

  onShareAppMessage() {
    return {
      title: (this.shareData && this.shareData.title) || '心镜 MindMirror - 专业心理测评与成长平台',
      path: '/pages/index/index',
      imageUrl: (this.shareData && this.shareData.imageUrl) || '/images/share.png'
    }
  },

  onShareTimeline() {
    return {
      title: '心镜 MindMirror - 43+专业心理测评',
      imageUrl: '/images/share.png'
    }
  }
})
