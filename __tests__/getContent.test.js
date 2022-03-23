import getContent from "../src/scripts/helpers/getContent.js";

const RSS_URL = "https://ru.hexlet.io/lessons.rss";
const BAD_RSS_URL = "htts://ru.hexlet.io/lessons.rss";

describe("test rss response", () => {
  it("success response 'heroku' data item:", () =>
    expect(getContent(RSS_URL)).resolves.not.toBeNull());

  it("bad request 'heroku' data item:", () =>
    expect(getContent(BAD_RSS_URL)).resolves.toBeNull());
});
