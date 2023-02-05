class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.newsInputEl = document.querySelector("#user-input");
    this.mainNewsEl = document.querySelector("#main-container");
    const submitButtonEl = document.querySelector("#submit-button");

    submitButtonEl.addEventListener("click", async () => this.searchNews());
  }
  async searchNews() {
    const searchQuery = this.newsInputEl.value;
    const news = await this.client.fetchNewsData(searchQuery);
    this.model.setNews(news);
    console.log(news);
    this.displayNews();
  }
  displayNews() {
    const allNews = this.model.getNews();
    allNews.forEach((article) => {
      this.displayArticle(article);
    });
  }

  displayArticle(article) {
    const newsDiv = document.createElement("div");
    const newsHeader = document.createElement("header");
    const newsImage = document.createElement("img");
    newsImage.src = article.fields.thumbnail;
    newsHeader.textContent = article.fields.headline;
    newsDiv.appendChild(newsHeader);
    newsDiv.appendChild(newsImage);
    newsDiv.className = "article";
    this.mainNewsEl.append(newsDiv);
  }
}
module.exports = NewsView;
