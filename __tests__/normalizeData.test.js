import normalizeData from "../src/scripts/helpers/normalizeData.js";
import parsedResult from "./__fixtures__/result/parsedXml.js";
import normalizedData from "./__fixtures__/result/normalizedData.js";

describe("test normalize data", () => {
  it("success normalized data:", () =>
    expect(normalizeData(parsedResult)).toStrictEqual(normalizedData));
});
