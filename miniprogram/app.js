App({
  onLaunch() {
    // 初始化设置
    const Settings = require('./utils/storage').default;
    const savedSettings = Settings.get(Settings.KEYS.SETTINGS);
    if (!savedSettings) {
      Settings.set(Settings.KEYS.SETTINGS, {
        theme: 'light',
        vibration: true,
        autoSave: true
      });
    }
  },

  globalData: {
    userInfo: null
  }
})
