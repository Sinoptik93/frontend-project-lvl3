import i18next from "i18next";
import { setLocale } from "yup";
import en from "./en.json";
import ru from "./ru.json";

const renderLocale = () => {
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
  document.querySelector("#form-example").innerText = i18next.t("form.example");
  document.querySelector("#clip-example").innerText = i18next.t("form.link");

  // FOOTER
  document.querySelector("#created-by").innerHTML =
    i18next.t("footer.createdBy");

  // POSTS
  const posts = document.querySelector(".h2.m-0");
  if (posts) {
    posts.innerText = i18next.t("posts.heading");
    document.querySelectorAll(".btn.btn-outline-primary.btn-sm").forEach((button) => {
      button.innerText = i18next.t("posts.openModal");
    })
  }

  // FEEDS
  const feeds = document.querySelector(".h3.m-0");
  if (feeds) {
    feeds.innerText = i18next.t("feeds.heading");
  }

  // ERRORS
  setLocale({
    string: {
      url: i18next.t("error.url"),
    },
  });
}

const options = {
  lng: "ru",
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
}

const localeHandler = (locale) => {
  document.querySelector(`#${locale}`).addEventListener("click", () => {
    i18next.changeLanguage(locale).then(() => renderLocale());
  })
}

const initLocale = () => {
  i18next.init(options);

  renderLocale()

  const localesList = Object.keys(options.resources);

  localesList.forEach((locale) => {
    localeHandler(locale);
  })
}

export default initLocale;
