import Storage from '../../utils/storage';

Page({
  data: {
    records: [],
    loading: true,
    activeTab: 'timeline',
    thisWeek: 0
  },

  onLoad() {
    this.loadRecords();
  },

  onShow() {
    this.loadRecords();
  },

  loadRecords() {
    const records = Storage.get(Storage.KEYS.RECORDS) || [];
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = records.filter(r => r.createdAt > weekAgo).length;
    this.setData({ records, thisWeek, loading: false });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  goToResult(e) {
    const recordId = e.currentTarget.dataset.recordId;
    wx.navigateTo({
      url: `/pages/assessment-result/result?recordId=${recordId}`);
  },

  deleteRecord(e) {
    const recordId = e.currentTarget.dataset.recordId;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          let records = Storage.get(Storage.KEYS.RECORDS) || [];
          records = records.filter(r => r.id !== recordId);
          Storage.set(Storage.KEYS.RECORDS, records);
          this.setData({ records });
        }
      }
    });
  }
});
