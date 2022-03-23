const defaultOptions = {
  value: false,
  classValid: "is-valid",
  classInvalid: "is-invalid",
};

const setStyle = (element, options = defaultOptions) => {
  const { value, classValid, classInvalid } = options;

  element.classList[value ? "remove" : "add"](classInvalid);
  element.classList[value ? "add" : "remove"](classValid);
};

export default setStyle;
