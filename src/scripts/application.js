import i18next from "i18next";
import validateUrl from "./helpers/validate.js";
import getRSSData from "./helpers/api.js";
import getWatchedState from "./render.js";
import parseXml from "./helpers/parseXml.js";
import normalizeData from "./helpers/normalizeData.js";

const application = () => {
  const initState = {
    form: {
      inputValue: "",
      isValid: null,
      messages: [],
    },
    rss: {
      sites: [],
      feed: {
        ids: [],
        list: {},
      },
      posts: {
        ids: [],
        list: {},
      },
    },
  };

  const form = document.querySelector(".js-form");
  const input = document.querySelector("#url-input");
  const messageBlock = document.querySelector(".js-message-block");
  const feedsBlock = document.querySelector(".js-feeds");
  const postsBlock = document.querySelector(".js-posts");
  const options = {
    input,
    form,
    messageBlock,
    feedsBlock,
    postsBlock,
  };
  const state = getWatchedState(initState, options);

  const resetFormData = () => {
    state.form.isValid = true;
    state.form.messages = [];
    state.form.inputValue = "";
  };

  input.addEventListener("keyup", () => {
    state.form.inputValue = input.value;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const url = input.value;

    validateUrl(url)
      .then((validUrl) => {
        const isNewItem = (link) => !state.rss.sites.includes(link);

        if (isNewItem(validUrl)) {
          state.rss.sites.push(url);
          getRSSData(validUrl).then((response) => {
            resetFormData();

            const rawData = parseXml(response);

            const { feed, posts } = normalizeData(rawData);

            state.rss.feed.list = {
              ...state.rss.feed.list,
              ...feed.list,
            };
            state.rss.feed.ids.push(...feed.ids);

            state.rss.posts.list = {
              ...state.rss.posts.list,
              ...posts.list,
            };
            state.rss.posts.ids.push(...posts.ids);

            state.form.isValid = true;
            state.form.messages.push(i18next.t("messages.successAdd"));
          });
        } else {
          state.form.isValid = false;
          state.form.messages.push(i18next.t("error.duplicate"));
        }
      })
      .catch((error) => {
        const { errors } = error;
        state.form.isValid = false;
        state.form.messages.push(...errors);
      });
  });
};

export default application;
