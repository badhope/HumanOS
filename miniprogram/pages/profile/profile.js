import Storage from '../../utils/storage';

Page({
  data: {
    settings: {},
    recordsCount: 0
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const settings = Storage.get(Storage.KEYS.SETTINGS) || { theme: 'light', vibration: true, autoSave: true, nickname: '用户' };
    const records = Storage.get(Storage.KEYS.RECORDS) || [];
    this.setData({ settings, recordsCount: records.length });
  },

  goToSettings() {
    wx.navigateTo({ url: '/pages/profile-settings/settings' });
  },

  goToAbout() {
    wx.navigateTo({ url: '/pages/profile-about/about' });
  },

  clearAllRecords() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有测评记录吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          Storage.set(Storage.KEYS.RECORDS, []);
          this.setData({ recordsCount: 0 });
          wx.showToast({ title: '清除成功', icon: 'success' });
        }
      }
    });
  }
});
