import Assessments from '../../data/assessments';
import Categories from '../../data/categories';

Page({
  data: {
    categories: [],
    activeCategory: '全部',
    assessments: [],
    keyword: '',
    searchInput: ''
  },

  onLoad() {
    this.initPage();
  },

  onShow() {
  },

  initPage() {
    this.setData({
      categories: Categories,
      assessments: Assessments.getAll()
    });
  },

  switchCategory(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ activeCategory: key });
    this.filterAssessments();
  },

  onSearchInput(e) {
    const value = e.detail.value;
    this.setData({ searchInput: value });
  },

  onSearchConfirm(e) {
    const keyword = e.detail.value.trim();
    this.setData({ keyword });
    this.filterAssessments();
  },

  clearSearch() {
    this.setData({ keyword: '', searchInput: '' });
    this.filterAssessments();
  },

  filterAssessments() {
    const { keyword, activeCategory } = this.data;
    let list = Assessments.getAll();

    if (activeCategory !== '全部') {
      list = Assessments.getByCategory(activeCategory);
    }

    if (keyword) {
      list = Assessments.search(keyword);
    }

    this.setData({ assessments: list });
  },

  goToAssessment(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/assessment-intro/intro?id=${id}`
    });
  }
});
