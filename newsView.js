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
    this.displayNews();
  }

  displayNews() {
    this.mainNewsEl.replaceChildren();
    const allNews = this.model.getNews();
    allNews.forEach((article) => {
      this.displayArticle(article);
    });
  }

  displayArticle(article) {
    const newsDiv = document.createElement("div");
    newsDiv.className = "article";
    const newsLink = document.createElement("a");
    newsLink.className = "anchorTag"
    newsLink.href = article.webUrl
    const newsHeader = document.createElement("header");
    const newsImage = document.createElement("img");
    newsImage.src = article.fields.thumbnail;
    newsHeader.textContent = article.fields.headline;
    newsDiv.appendChild(newsLink)
    newsLink.appendChild(newsHeader);
    newsLink.appendChild(newsImage);
    this.mainNewsEl.append(newsDiv);
  }
}
module.exports = NewsView;
