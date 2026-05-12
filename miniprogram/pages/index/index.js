Page({
  data: {
    hotAssessments: [
      { id: 'ocean-bigfive', emoji: '🧠', name: '大五人格', count: '12.8w' },
      { id: 'mbti-normal', emoji: '🎭', name: 'MBTI', count: '25.6w' },
      { id: 'disc-normal', emoji: '📊', name: 'DISC', count: '8.3w' },
      { id: 'dark-triad', emoji: '🌑', name: '黑暗三角', count: '6.1w' },
      { id: 'eq-goleman', emoji: '❤️', name: '情商EQ', count: '9.7w' },
      { id: 'sas-standard', emoji: '😌', name: '焦虑SAS', count: '15.2w' },
    ]
  },

  goAssessment() {
    wx.switchTab({ url: '/pages/webview/webview' })
  },

  goTraining() {
    wx.switchTab({
      url: '/pages/webview/webview',
      success: () => {
        this._sendToWebview({ action: 'navigate', path: '/app/training' })
      }
    })
  },

  goDaily() {
    wx.switchTab({
      url: '/pages/webview/webview',
      success: () => {
        this._sendToWebview({ action: 'navigate', path: '/app/daily' })
      }
    })
  },

  goDiscover() {
    wx.switchTab({
      url: '/pages/webview/webview',
      success: () => {
        this._sendToWebview({ action: 'navigate', path: '/app/discover' })
      }
    })
  },

  goAssessmentDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.switchTab({
      url: '/pages/webview/webview',
      success: () => {
        this._sendToWebview({ action: 'navigate', path: `/assessment/${id}` })
      }
    })
  },

  _sendToWebview(data) {
    const channel = wx.getOpenerEventChannel && wx.getOpenerEventChannel()
    if (channel) {
      channel.emit('navigate', data)
    }
  },

  onShareAppMessage() {
    return {
      title: '心镜 MindMirror - 专业心理测评与成长平台',
      path: '/pages/index/index',
      imageUrl: '/images/share.png'
    }
  },

  onShareTimeline() {
    return {
      title: '心镜 MindMirror - 43+专业心理测评',
      imageUrl: '/images/share.png'
    }
  }
})
