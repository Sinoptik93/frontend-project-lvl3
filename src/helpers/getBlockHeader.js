const getBlockHeader = (content, bootstrapClass = "h4") => {
  const postsHeadingWrapper = document.createElement("div");
  postsHeadingWrapper.classList.add("card-body");

  const heading = document.createElement("h2");
  heading.classList.add(bootstrapClass, "m-0");
  heading.innerText = content;

  postsHeadingWrapper.appendChild(heading);

  return postsHeadingWrapper;
}

export default getBlockHeader;
