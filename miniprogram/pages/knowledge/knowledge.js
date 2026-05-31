import articles from '../../data/knowledge';

Page({
  data: {
    articles: []
  },

  onLoad() {
    this.setData({ articles });
  },

  goToArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/knowledge-article/article?id=${id}`
    });
  }
});
