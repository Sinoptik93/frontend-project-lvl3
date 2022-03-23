import i18next from "i18next";
import { setLocale } from "yup";
import en from "./en.json";
import ru from "./ru.json";

function initLocale() {
  i18next.init({
    lng: "ru",
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  });

  // META
  document.querySelector("title").innerHTML = i18next.t("meta.title");

  // MODAL
  document.querySelector("#modal-read").innerHTML = i18next.t("modal.read");
  document.querySelector("#modal-close").innerHTML = i18next.t("modal.close");

  // HEADING
  document.querySelector("#title").innerHTML = i18next.t("heading.title");
  document.querySelector("#subtitle").innerHTML = i18next.t("heading.subtitle");

  // FORM
  document.querySelector("#input-placeholder").innerHTML =
    i18next.t("form.placeholder");
  document.querySelector("#submit-button").innerHTML = i18next.t("form.submit");
  document.querySelector("#form-example").innerHTML = i18next.t("form.example");

  // FOOTER
  document.querySelector("#created-by").innerHTML =
    i18next.t("footer.createdBy");

  // ERRORS
  setLocale({
    string: {
      url: i18next.t("error.url"),
    },
  });
}

export default initLocale;
