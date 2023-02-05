/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NewsModel = require("./newsModel");
const NewsView = require("./newsView");
const NewsClient = require("./newsClient");
jest.mock("./newsClient");

const mockClient = new NewsClient();
mockClient.fetchNewsData.mockImplementation((query) => [
  {
    id: "world/2023/feb/01/martin-loses-appeal-in-romania-over-extended-detention",
    webTitle: "A headline",
    webUrl:
      "https://www.theguardian.com/world/2023/feb/01/martin-loses-appeal-in-romania-over-extended-detention",
    apiUrl:
      "https://content.guardianapis.com/world/2023/feb/01/martin-loses-appeal-in-romania-over-extended-detention",
    fields: {
      headline: "A headline",
      byline: "Jon Henley",
      thumbnail:
        "https://media.guim.co.uk/5f1a7a4bb6e5f6733ffafdd319f1eb44fe08f83a/0_39_3022_1813/500.jpg",
    },
  },
  {
    id: "world/2023/jan/10/martin-loses-legal-appeal-to-end-detention-in-romania",
    webTitle: "Another headline",
    webUrl:
      "https://www.theguardian.com/world/2023/jan/10/martin-loses-legal-appeal-to-end-detention-in-romania",
    apiUrl:
      "https://content.guardianapis.com/world/2023/jan/10/martin-loses-legal-appeal-to-end-detention-in-romania",
    fields: {
      headline: "Another headline",
      byline: "Jon Henley Europe correspondent",
      thumbnail:
        "https://media.guim.co.uk/f6fa1a038327fece21344c1914b5ac90bb1242fd/0_145_8014_4810/500.jpg",
    },
  },
]);

describe("NewsView", () => {
  beforeEach(() => {
    NewsClient.mockClear();
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays all news in the news model", async () => {
    const model = new NewsModel();
    const view = new NewsView(model, mockClient);
    await view.searchNews("search term");
    await expect(document.querySelectorAll("div.article").length).toEqual(2);
    expect(document.querySelectorAll("div.article")[0].textContent).toEqual(
      "A headline"
    );
  });

  it("searches for the news when search is clicked", async () => {
    const model = new NewsModel();
    const view = new NewsView(model, mockClient);
    const searchNewsSpy = jest.spyOn(view, "searchNews");
    const newsClientSpy = jest.spyOn(mockClient, "fetchNewsData");
    const newsInputEl = document.querySelector("#user-input");
    newsInputEl.value = "a search term";
    const submitButtonEl = document.querySelector("#submit-button");
    submitButtonEl.click();
    expect(searchNewsSpy).toHaveBeenCalledTimes(1);
    expect(newsClientSpy).toHaveBeenCalledWith("a search term");
  });
});
