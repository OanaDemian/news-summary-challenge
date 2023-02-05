class NewsModel {
  constructor() {
    this.news = null;
  }

  setNews(news) {
    this.news = news;
  }

  getNews() {
    return this.news;
  }
}

module.exports = NewsModel;
