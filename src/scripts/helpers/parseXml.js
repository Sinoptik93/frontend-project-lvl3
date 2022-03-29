const parseXml = (xml) => {
  const parser = new DOMParser();
  const getDataFromXml = (xmlString) => parser.parseFromString(xmlString, "application/xml");
  const removeCdata = (targetString) => targetString.replace("<![CDATA[", "").replace("]]>", "");

  const rssData = getDataFromXml(xml).querySelector("rss");
  if (!rssData) throw Error("no rss");

  const title = removeCdata(rssData?.querySelector("title").innerHTML);
  const description = removeCdata(rssData?.querySelector("description").innerHTML);
  const itemsNodes = rssData?.querySelectorAll("item");

  const parseItem = ({ childNodes }) => {
    const childList = [...childNodes].filter((item) => item.nodeName !== "#text")

    return childList.reduce((acc, child) => {
      const key = child.tagName === "guid" ? "id" : child.tagName.toLowerCase();
      const entry = {[key]: removeCdata(child.innerHTML)};
      return {...acc, ...entry}
    }, {})
  }

  const posts = [...itemsNodes].map(parseItem);

  return { title, description, posts };
};

export default parseXml;
