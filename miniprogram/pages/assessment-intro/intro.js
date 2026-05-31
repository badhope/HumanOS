import Assessments from '../../data/assessments';
import Validator from '../../utils/validator';

Page({
  data: {
    assessment: null,
    loading: true,
    expanded: false
  },

  onLoad(options) {
    const { id } = options;
    if (!id) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.loadAssessment(id);
  },

  loadAssessment(id) {
    const assessment = Assessments.getById(id);
    if (!assessment) {
      wx.showToast({ title: '测评不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    const check = Validator.checkAssessment(assessment);
    if (!check.valid) {
      wx.showToast({ title: check.error, icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    wx.setNavigationBarTitle({ title: assessment.name });
    this.setData({ assessment, loading: false });
  },

  toggleExpand() {
    this.setData({ expanded: !this.data.expanded });
  },

  startAssessment() {
    const { assessment } = this.data;
    wx.navigateTo({
      url: `/pages/assessment-taking/taking?id=${assessment.id}`
    });
  }
});
