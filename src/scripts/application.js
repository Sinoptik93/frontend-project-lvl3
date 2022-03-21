import validateUrl from "./helpers/validate.js";
import getRSSData from "./helpers/api.js";
import getWatchedState from "./view.js";

const application = () => {
  const initState = {
    form: {
      inputValue: "",
      isValid: true,
      errors: [],
    },
    rssList: [],
  };

  const form = document.querySelector(".js-form");
  const input = document.querySelector("#url-input");
  const blockErrors = document.querySelector(".js-error-block");
  const options = {
    input,
    form,
    blockErrors,
  };
  const state = getWatchedState(initState, options);

  const resetFormData = () => {
    state.form.isValid = true;
    state.form.errors = [];
    state.form.inputValue = "";
  };

  const errCb = (error) => {
    const { name, errors } = error;
    state.form.isValid = false;
    state.form.errors.push(...errors);
  };

  input.addEventListener("keyup", () => {
    state.form.inputValue = input.value;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const url = input.value;

    validateUrl(url, errCb)
      .then((result) => {
        console.log(state.rssList.includes(result));
        const isNewItem = (siteName) => !state.rssList.includes(siteName);

        if (isNewItem(result)) {
          state.rssList.push(url);
          resetFormData();
          getRSSData(result).then((response) => console.log(response));
        } else {
          state.form.isValid = false;
          state.form.errors.push("in array this site");
        }
      })
      .catch(errCb);
  });
};

export default application;
