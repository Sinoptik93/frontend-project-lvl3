const readStyle = (postId) => {
  const targetTitle = document.querySelector(`a[data-id='${postId}']`);

  targetTitle.classList.remove("fw-bold");
  targetTitle.classList.add("fw-normal", "link-secondary");
};

export default readStyle;
