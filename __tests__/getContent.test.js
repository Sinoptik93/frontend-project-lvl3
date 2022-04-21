import getContent from "../src/helpers/getContent.js";

const VALID_RSS_URL = "https://ru.hexlet.io/lessons.rss";
const INVALID_RSS_URL = "htts://ru.hexlet.io/lessons.rss";

describe("test rss response", () => {
  it("success response 'heroku' data item:", () =>
    expect(getContent(VALID_RSS_URL)).resolves.not.toBeNull());

  it("bad request 'heroku' data item:", () =>
    expect(getContent(INVALID_RSS_URL)).resolves.toBeNull());
});
