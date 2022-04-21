import parseXml from "../src/helpers/parseXml.js";
import xmlString from "./__fixtures__/xml/xmlString.js";
import parsedXml from "./__fixtures__/result/parsedXml.js";

describe("test parsing xml", () => {
  it("success parsed xml:", () =>
    expect(parseXml(xmlString)).toStrictEqual(parsedXml));
});
