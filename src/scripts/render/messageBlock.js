const renderMessageBlock = (messageBlock, messageList) => {
  if (messageList.length) {
    messageList.forEach((message) => {
      const errorElement = document.createElement("p");
      errorElement.innerText = message;

      messageBlock.innerHTML = "";
      messageBlock.appendChild(errorElement);
    });
  } else {
    messageBlock.innerHTML = "";
  }
};

export default renderMessageBlock;
