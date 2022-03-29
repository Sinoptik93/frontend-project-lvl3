const popupContent = (popupElement, postsList, postId) => {
  const modalTitle = popupElement.querySelector(".modal-title");
  const modalBody = popupElement.querySelector(".modal-body");

  const { title, description } = postsList[postId];
  modalTitle.innerHTML = title;
  modalBody.innerHTML = description;
}

export default popupContent;
