const app = getApp()

Page({
  data: {
    webUrl: ''
  },

  onLoad(options) {
    const url = app.globalData.webUrl || 'https://mindmirror.dpdns.org'
    this.setData({ webUrl: url })
    console.log('加载网页:', url)
  },

  onShareAppMessage() {
    return {
      title: '心镜 - 心理测评与成长训练',
      path: '/pages/index/index'
    }
  }
})