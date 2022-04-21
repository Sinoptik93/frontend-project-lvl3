const renderPopupContent = (popupElement, postsList, postId) => {
  const modalTitle = popupElement.querySelector(".modal-title");
  const modalBody = popupElement.querySelector(".modal-body");
  const modalButton = popupElement.querySelector("#modal-read");

  const [{ title, description, link }] = postsList.filter((post) => post.link === postId);
  modalTitle.innerHTML = title;
  modalBody.innerHTML = description;
  modalButton.href = link;
};

export default renderPopupContent;
