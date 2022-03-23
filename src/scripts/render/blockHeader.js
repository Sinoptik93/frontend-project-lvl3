import i18next from "i18next";

const getHeader = (bootstrapClass = "h4") => {
  const postsHeadingWrapper = document.createElement("div");
  postsHeadingWrapper.classList.add("card-body");

  const heading = document.createElement("h2");
  heading.classList.add(bootstrapClass, "m-0");
  heading.innerText = i18next.t("posts.heading");

  postsHeadingWrapper.appendChild(heading);

  return postsHeadingWrapper;
}

export default getHeader;
