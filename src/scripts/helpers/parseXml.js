import initIdGenerator from "./initIdGenerator.js";

const getId = initIdGenerator();

const parseXml = (xml) => {
  const parser = new DOMParser();
  const xmlData = parser.parseFromString(xml.data, "application/xml");

  const rssData = xmlData.querySelector("rss");
  if (!rssData) throw Error("no rss");

  const title = rssData?.querySelector("title").innerHTML;
  const description = rssData?.querySelector("description").innerHTML;
  const itemsNodes = rssData?.querySelectorAll("item");

  const parseItem = ({ childNodes }) => {
    const childList = [...childNodes].filter((item) => item.nodeName !== "#text")

    return childList.reduce((acc, child) => {
      const key = child.tagName.toLowerCase();
      const entry = {[key]: child.innerHTML};
      return {...acc, ...entry}
    }, {})
  }

  const posts = [...itemsNodes].map(parseItem);

  return { id: getId(), title, description, posts };
};

export default parseXml;
