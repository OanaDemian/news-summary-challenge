const NewsModel = require("./newsModel");
describe("NewsModel", () => {
  it("returns null when no news ", () => {
    const model = new NewsModel();
    expect(model.getNews()).toEqual(null);
  });
});
