import i18next from "i18next";
import { setLocale } from "yup";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

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

  document.querySelector("title").innerHTML = i18next.t("meta.title");

  document.querySelector("#modal-read").innerHTML = i18next.t("modal.read");
  document.querySelector("#modal-close").innerHTML = i18next.t("modal.close");

  document.querySelector("#title").innerHTML = i18next.t("heading.title");
  document.querySelector("#subtitle").innerHTML = i18next.t("heading.subtitle");

  document.querySelector("#input-placeholder").innerHTML =
    i18next.t("form.placeholder");
  document.querySelector("#submit-button").innerHTML = i18next.t("form.submit");
  document.querySelector("#form-example").innerHTML = i18next.t("form.example");

  document.querySelector("#created-by").innerHTML =
    i18next.t("footer.createdBy");

  setLocale({
    string: {
      url: i18next.t("error.url"),
    },
  });
}

export default initLocale;
