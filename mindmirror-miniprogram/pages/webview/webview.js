const app = getApp()

Page({
  data: {
    webUrl: '',
    errorMessage: ''
  },

  onLoad(options) {
    const url = app.globalData.webUrl || 'https://mindmirror.dpdns.org'
    this.setData({ 
      webUrl: url,
      errorMessage: ''
    })
    console.log('加载网页:', url)
  },

  onWebViewLoad(e) {
    console.log('网页加载成功', e)
    this.setData({ errorMessage: '' })
  },

  onWebViewError(e) {
    console.error('网页加载失败', e)
    this.setData({ 
      errorMessage: '请检查网络连接或联系管理员配置业务域名'
    })
  },

  retryLoad() {
    this.setData({ errorMessage: '' })
    const url = this.data.webUrl
    this.setData({ webUrl: '' })
    setTimeout(() => {
      this.setData({ webUrl: url })
    }, 100)
  },

  onShareAppMessage() {
    return {
      title: '心镜 - 心理测评与成长训练',
      path: '/pages/index/index'
    }
  }
})