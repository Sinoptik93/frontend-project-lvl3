const renderMessageBlock = (messageBlock, message) => {
  if (message) {
    const element = document.createElement("p");
    element.innerText = message;

    messageBlock.innerHTML = "";
    messageBlock.appendChild(element);
  } else {
    messageBlock.innerHTML = "";
  }
};

export default renderMessageBlock;
