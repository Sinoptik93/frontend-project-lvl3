import i18next from "i18next";

import getBlockHeader from "../helpers/getBlockHeader.js";

const getPostItem = (data, { isRead = false }) => {
  const { title, link } = data;

  const linkClass = isRead ? "link-secondary fw-normal" : "fw-bold";

  return (
    `<li class="list-group-item
      d-flex
      justify-content-between
      align-items-start
      border-0
      border-end-0"
    >
      <a 
        href="${link}"
        class="${linkClass}"
        data-id="${link}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${title}
      </a>
        <button 
          type="button" 
          class="btn btn-outline-primary btn-sm"
          data-id=${link}
          data-bs-toggle="modal"
          data-bs-target="#modal"
        >
          ${i18next.t("posts.openModal")}
        </button>
    </li>`
  );
};

const renderPosts = (element, data) => {
  element.innerHTML = "";
  const { posts, readList } = data;

  if (!posts.length) {
    element.innerHTML = "";
    return;
  }

  const postsList = document.createElement("ul");
  postsList.classList.add("list-group", "border-0", "rounded-0");

  posts.forEach((post) => {
    const isRead = readList.includes(post.link);
    const newPost = getPostItem(post, {isRead});
    postsList.innerHTML += newPost;
  });

  element.appendChild(getBlockHeader(i18next.t("posts.heading"), "h2"));
  element.appendChild(postsList);
};

export default renderPosts;
