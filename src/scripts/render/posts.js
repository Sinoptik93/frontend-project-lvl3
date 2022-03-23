import i18next from "i18next";

import getHeader from "./blockHeader.js";

const getPostItem = (data) => {
  const { id, title, link } = data;
  return (
    `<li class="list-group-item
      d-flex
      justify-content-between
      align-items-start
      border-0
      border-end-0"
    >
      <a 
        href=${link}
        class="fw-bold"
        data-id=${id}
        target="_blank"
        rel="noopener noreferrer"
      >
        ${title}
      </a>
        <button 
          type="button" 
          class="btn btn-outline-primary btn-sm"
          data-id="13"
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
  const { ids, list } = data;

  if (!ids.length) {
    element.innerHTML = "";
    return;
  }

  const postsList = document.createElement("ul");
  postsList.classList.add("list-group", "border-0", "rounded-0");

  ids.forEach((id) => {
    const newPost = getPostItem(list[id]);
    postsList.innerHTML += newPost;
  });

  element.appendChild(getHeader("h4"));
  element.appendChild(postsList);
};

export default renderPosts;
