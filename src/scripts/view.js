import onChange from "on-change";

const setInvalid = (element) => {
  element.classList.add("is-invalid");
  element.classList.remove("is-valid");
};

const setValid = (element) => {
  element.classList.add("is-valid");
  element.classList.remove("is-invalid");
};

const toogleValid = (element) => {
  const isValid = element.classList.contains("is-valid");

  element.classList.add(isValid ? "is-invalid" : "is-valid");
  element.classList.remove(isValid ? "is-valid" : "is-invalid");
};

const renderRSSList = (data) => {
  console.log(data);
};

const renderErrorBlock = (errorBlock, errorsList) => {
  if (errorsList.length) {
    errorsList.forEach((error) => {
      const errorElement = document.createElement("p");
      errorElement.innerText = error;

      errorBlock.innerHTML = "";
      errorBlock.appendChild(errorElement);
    });
  } else {
    errorBlock.innerHTML = "";
  }
};

const renderInput = (inputElement, value) => {
  inputElement.value = value;
};

const getWatchState = (state, options) => {
  const { input, blockErrors } = options;
  return onChange(state, (path, value, previousValue, applyData) => {
    switch (path) {
      case "form.isValid": {
        if (value) {
          setValid(input);
        } else {
          setInvalid(input);
        }
        break;
      }
      case "form.errors": {
        renderErrorBlock(blockErrors, value);
        break;
      }
      case "form.inputValue": {
        renderInput(input, value);
        break;
      }
      case "rssList": {
        renderRSSList(value);
        break;
      }
      default: {
        console.error(path);
      }
    }
  });
};

export default getWatchState;
