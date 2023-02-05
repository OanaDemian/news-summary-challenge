const apiKey = require("./apiKey");

class NewsClient {
  fetchNewsData(query) {
    return fetch(
      `https://content.guardianapis.com/search?q=${query}&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => data.response.results);
  }
}

module.exports = NewsClient;
