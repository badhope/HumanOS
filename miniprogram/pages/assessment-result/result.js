import Storage from '../../utils/storage';
import DateUtil from '../../utils/date';

Page({
  data: {
    record: null,
    loading: true
  },

  onLoad(options) {
    const { recordId } = options;
    if (!recordId) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.loadResult(recordId);
  },

  loadResult(recordId) {
    const records = Storage.get(Storage.KEYS.RECORDS) || [];
    const record = records.find(r => r.id === recordId);

    if (!record) {
      wx.showToast({ title: '记录不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    wx.setNavigationBarTitle({ title: record.assessmentName });
    this.setData({ record, loading: false });
  },

  retake() {
    const { record } = this.data;
    wx.redirectTo({
      url: `/pages/assessment-taking/taking?id=${record.assessmentId}`
    });
  },

  goToArchive() {
    wx.switchTab({
      url: '/pages/archive/archive'
    });
  },

  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
