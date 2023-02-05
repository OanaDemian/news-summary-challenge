const NewsClient = require("./newsClient");
require("jest-fetch-mock").enableMocks();

describe("NewsClient class", () => {
  it("calls fetch and loads news", async () => {
    const client = new NewsClient();
    fetch.mockResponseOnce(
      JSON.stringify({
        response: {
          results: ["result"],
        },
      })
    );

    const americaNews = await client.fetchNewsData("America");
    expect(americaNews).toStrictEqual(["result"]);
  });
});
