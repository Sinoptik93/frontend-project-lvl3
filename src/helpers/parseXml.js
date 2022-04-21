const parseXml = (xml) => {
  const parser = new DOMParser();
  const getDataFromXml = (xmlString) => parser.parseFromString(xmlString, "application/xml");
  const itemParser = ({ childNodes }) => {
    const childList = [...childNodes].filter((item) => item.nodeName !== "#text");

    return childList.reduce((acc, child) => {
      const key = child.tagName.toLowerCase();
      return {...acc, ...{[key]: child.textContent}}
    }, {});
  }

  const rssData = getDataFromXml(xml).querySelector("rss");
  if (!rssData) throw Error("no rss");

  const title = rssData?.querySelector("title").textContent;
  const description = rssData?.querySelector("description").textContent;
  const url = rssData?.querySelector("link").textContent;

  const itemsNodes = rssData?.querySelectorAll("item");

  const feed = {title, description, url};
  const posts = [...itemsNodes].map(itemParser);

  return { feed, posts };
};

export default parseXml;
