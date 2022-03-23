const setInputStyle = (element, options = { isValid: false }) => {
  const { isValid } = options;

  element.classList[isValid ? "remove" : "add"]("is-invalid");
  element.classList[isValid ? "add" : "remove"]("is-valid");
};

const setMessageStyle = (element, options = { isSuccess: false }) => {
  const { isSuccess } = options;

  element.classList[isSuccess ? "remove" : "add"]("text-danger");
  element.classList[isSuccess ? "add" : "remove"]("text-success");
};

export { setInputStyle, setMessageStyle };
