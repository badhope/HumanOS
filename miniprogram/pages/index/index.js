import DateUtil from '../../utils/date';
import Assessments from '../../data/assessments';
import Storage from '../../utils/storage';

Page({
  data: {
    greeting: '',
    nickname: '用户',
    stats: {
      total: 0,
      streak: 0,
      lastWeek: 0
    },
    recentRecords: [],
    featuredAssessments: []
  },

  onLoad() {
    this.initPage();
  },

  onShow() {
    this.refreshStats();
  },

  initPage() {
    this.setData({ greeting: DateUtil.getGreeting() });
    this.loadNickname();
    this.loadFeatured();
    this.refreshStats();
  },

  loadNickname() {
    const settings = Storage.get(Storage.KEYS.SETTINGS) || {};
    this.setData({ nickname: settings.nickname || '用户' });
  },

  loadFeatured() {
    const all = Assessments.getAll();
    const featured = all.slice(0, 3);
    this.setData({ featuredAssessments: featured });
  },

  refreshStats() {
    const records = Storage.get(Storage.KEYS.RECORDS) || [];
    const stats = this.calcStats(records);
    this.setData({
      stats,
      recentRecords: records.slice(0, 3)
    });
  },

  calcStats(records) {
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    let streak = 0;
    let lastWeek = 0;
    const dates = new Set();

    records.forEach(r => {
      if (now - r.createdAt < oneWeek) lastWeek++;
      const d = new Date(r.createdAt).toDateString();
      dates.add(d);
    });

    const sortedDates = Array.from(dates).sort((a, b) => new Date(b) - new Date(a));
    const today = new Date().toDateString();
    const yesterday = new Date(now - 24 * 60 * 60 * 1000).toDateString();

    if (sortedDates.includes(today) || sortedDates.includes(yesterday)) {
      let currentDate = new Date();
      for (let i = 0; i < 365; i++) {
        const dateStr = currentDate.toDateString();
        if (dates.has(dateStr)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else if (i > 0) {
          break;
        } else {
          currentDate.setDate(currentDate.getDate() - 1);
        }
      }
    }

    return {
      total: records.length,
      streak,
      lastWeek
    };
  },

  goToAssessment(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/assessment-intro/intro?id=${id}`
    });
  },

  goToRecordDetail(e) {
    const { recordId } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/assessment-result/result?recordId=${recordId}`
    });
  },

  goToLibrary() {
    wx.switchTab({
      url: '/pages/library/library'
    });
  },

  goToArchive() {
    wx.switchTab({
      url: '/pages/archive/archive'
    });
  },

  goToKnowledge() {
    wx.navigateTo({
      url: '/pages/knowledge/knowledge'
    });
  }
});
