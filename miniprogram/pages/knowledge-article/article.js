import articles from '../../data/knowledge';

Page({
  data: {
    article: null
  },

  onLoad(options) {
    const id = options.id;
    const article = articles.find(a => a.id === id);
    if (article) {
      wx.setNavigationBarTitle({ title: article.title });
      this.setData({ article });
    } else {
      wx.showToast({ title: '文章不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  }
});
