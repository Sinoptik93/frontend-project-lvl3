import getHeader from "./blockHeader.js";

const getFeedItem = (data) => {
  const { title, description } = data;

  const feedItem = document.createElement("li");
  feedItem.classList.add("list-group-item", "border-0", "border-end-0");

  const feedItemHeading = document.createElement("h3");
  feedItemHeading.classList.add("h6", "m-0");
  feedItemHeading.innerText = title;

  const feedItemBody = document.createElement("p");
  feedItemBody.classList.add("m-0", "small", "text-black-50");
  feedItemBody.innerText = description;

  feedItem.appendChild(feedItemHeading);
  feedItem.appendChild(feedItemBody);

  return feedItem;
};

const renderFeeds = (element, data) => {
  element.innerHTML = "";
  const { ids, list } = data;

  if (!ids.length) {
    element.innerHTML = "";
    return;
  }

  const feedsList = document.createElement("ul");
  feedsList.classList.add("list-group", "border-0", "rounded-0");

  ids.forEach((id) => {
    const newFeed = getFeedItem(list[id]);
    feedsList.appendChild(newFeed);
  });

  element.appendChild(getHeader("h6"));
  element.appendChild(feedsList);
};

export default renderFeeds;
