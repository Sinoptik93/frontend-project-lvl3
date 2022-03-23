const parseXml = (xml) => {
  const parser = new DOMParser();
  const xmlData = parser.parseFromString(xml, "application/xml");

  const rssData = xmlData.querySelector("rss");
  const title = rssData.querySelector("title").innerHTML;
  const description = rssData.querySelector("description").innerHTML;
  const itemsNodes = rssData.querySelectorAll("item");

  const parseItem = ({ childNodes }) => {
    const childList = [...childNodes].filter((item) => item.nodeName !== "#text")

    return childList.reduce((acc, child) => {
      const entry = {[child.tagName.toLowerCase()]: child.innerHTML};
      return {...acc, ...entry}
    }, {})
  }

  const newsList = [...itemsNodes].map(parseItem);

  return { title, description, newsList };
};

export default parseXml;
