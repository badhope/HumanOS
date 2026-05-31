import Storage from '../../utils/storage';

Page({
  data: {
    settings: {
      nickname: '用户',
      vibration: true,
      theme: 'light'
    }
  },

  onLoad() {
    const settings = Storage.get(Storage.KEYS.SETTINGS) || {
      nickname: '用户',
      vibration: true,
      theme: 'light'
    };
    this.setData({ settings });
  },

  onNicknameInput(e) {
    const nickname = e.detail.value;
    this.setData({ 'settings.nickname': nickname });
    this.saveSettings();
  },

  onVibrationChange(e) {
    const vibration = e.detail.value;
    this.setData({ 'settings.vibration': vibration });
    this.saveSettings();
  },

  onThemeChange(e) {
    const theme = e.detail.value;
    this.setData({ 'settings.theme': theme });
    this.saveSettings();
  },

  saveSettings() {
    Storage.set(Storage.KEYS.SETTINGS, this.data.settings);
  }
});
