import parseXml from "../src/scripts/helpers/parseXml.js";
import xmlString from "./__fixtures__/xml/xmlString.js";
import parsedResult from "./__fixtures__/xml/parsedResult.js";

describe("test parsing xml", () => {
  it("success parsed xml:", () =>
    expect(parseXml(xmlString)).toStrictEqual(parsedResult));
});
