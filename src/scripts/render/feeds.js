import i18next from "i18next";

const getHeader = () => {
  const feedHeadingWrapper = document.createElement("div");
  feedHeadingWrapper.classList.add("card-body");

  const heading = document.createElement("h2");
  heading.classList.add("h6", "m-0");
  heading.innerText = i18next.t("feeds.heading");

  feedHeadingWrapper.appendChild(heading);

  return feedHeadingWrapper;
};

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

  element.appendChild(getHeader());
  element.appendChild(feedsList);
};

export default renderFeeds;
