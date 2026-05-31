import Assessments from '../../data/assessments';
import Calculator from '../../utils/calculator';
import Storage from '../../utils/storage';
import Validator from '../../utils/validator';

Page({
  data: {
    assessment: null,
    currentIndex: 0,
    answers: [],
    selectedValue: null,
    loading: true,
    showExitConfirm: false
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

  onUnload() {
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
    this.setData({
      assessment,
      loading: false,
      answers: []
    });
    this.restoreAnswer();
  },

  restoreAnswer() {
    const { currentIndex, answers, assessment } = this.data;
    const question = assessment.questions[currentIndex];
    const saved = answers.find(a => a.questionId === question.id);
    this.setData({ selectedValue: saved ? saved.value : null });
  },

  selectOption(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ selectedValue: value });

    const settings = Storage.get(Storage.KEYS.SETTINGS) || {};
    if (settings.vibration !== false) {
      wx.vibrateShort({ type: 'light' });
    }
  },

  confirmAnswer() {
    const { selectedValue, currentIndex, assessment, answers } = this.data;

    if (!selectedValue) {
      wx.showToast({ title: '请选择一个答案', icon: 'none' });
      return;
    }

    const question = assessment.questions[currentIndex];
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({ questionId: question.id, value: selectedValue });

    if (currentIndex >= assessment.questions.length - 1) {
      this.setData({ answers: newAnswers });
      this.finishAssessment();
    } else {
      this.setData({
        answers: newAnswers,
        currentIndex: currentIndex + 1,
        selectedValue: null
      });
      this.restoreAnswer();
    }
  },

  goPrev() {
    const { currentIndex } = this.data;
    if (currentIndex <= 0) return;

    this.setData({
      currentIndex: currentIndex - 1,
      selectedValue: null
    });
    this.restoreAnswer();
  },

  finishAssessment() {
    const { assessment, answers } = this.data;

    const check = Validator.checkAnswers(answers, assessment.questions.length);
    if (!check.valid) {
      wx.showToast({ title: check.error, icon: 'none' });
      return;
    }

    wx.showLoading({ title: '计算中...' });

    setTimeout(() => {
      try {
        const result = Calculator.calculate(assessment, answers);

        const records = Storage.get(Storage.KEYS.RECORDS) || [];
        const newRecord = {
          id: 'record_' + Date.now(),
          assessmentId: assessment.id,
          assessmentName: assessment.name,
          assessmentIcon: assessment.icon,
          assessmentColor: assessment.color,
          answers,
          result,
          createdAt: Date.now(),
          tags: []
        };
        records.unshift(newRecord);
        Storage.set(Storage.KEYS.RECORDS, records);

        wx.hideLoading();

        wx.redirectTo({
          url: `/pages/assessment-result/result?recordId=${newRecord.id}`
        });
      } catch (e) {
        wx.hideLoading();
        console.error('计算结果失败', e);
        wx.showToast({ title: '计算结果时出错', icon: 'none' });
      }
    }, 500);
  },

  showExitDialog() {
    this.setData({ showExitConfirm: true });
  },

  hideExitDialog() {
    this.setData({ showExitConfirm: false });
  },

  confirmExit() {
    wx.navigateBack();
  }
});
