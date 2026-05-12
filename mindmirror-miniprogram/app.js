App({
  onLaunch() {
    console.log('心镜小程序启动')
    this.checkNetworkStatus()
    this.listenNetworkStatus()
    this.checkUpdate()
  },

  onShow() {
    console.log('小程序显示')
  },

  onHide() {
    console.log('小程序隐藏')
  },

  checkNetworkStatus() {
    wx.getNetworkType({
      success: (res) => {
        const networkType = res.networkType
        console.log('当前网络状态:', networkType)
        if (networkType === 'none') {
          wx.showToast({
            title: '当前无网络',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  listenNetworkStatus() {
    wx.onNetworkStatusChange((res) => {
      console.log('网络状态变化:', res)
      if (!res.isConnected) {
        wx.showToast({
          title: '网络已断开',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '网络已连接',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },

  checkUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          console.log('发现新版本')
        }
      })

      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })

      updateManager.onUpdateFailed(() => {
        wx.showModal({
          title: '更新失败',
          content: '新版本下载失败，请检查网络后重试',
          showCancel: false
        })
      })
    }
  },

  globalData: {
    webUrl: 'https://mindmirror.dpdns.org',
    userInfo: null
  }
})