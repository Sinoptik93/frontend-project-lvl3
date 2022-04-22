import i18next from "i18next";
import { Tooltip } from 'bootstrap';
import differenceWith from 'lodash/differenceWith.js';
import isEqual from "lodash/isEqual.js";
import validateUrl from "./helpers/validate.js";
import getRSSData from "./helpers/api.js";
import getWatchedState from "./render/index.js";
import parseXml from "./helpers/parseXml.js";
import timer from "./helpers/timer.js";
import initLocale from "./locales/index.js";

const application = () => {
  const initState = {
    form: {
      inputValue: "",
      isValid: false,
      status: 'filling',
    },
    loadingProcess: {
      status: 'idle',
      errors:  [],
      messages: [],
    },
    feeds: [],
    posts: [],
    modal: {
      postId: 0,
    },

    ui: {
      seenPosts: [],
    },
  };

  const form = document.querySelector(".js-form");
  const input = document.querySelector("#url-input");
  const messageBlock = document.querySelector(".js-message-block");
  const feedsBlock = document.querySelector(".js-feeds");
  const postsBlock = document.querySelector(".js-posts");
  const popup = document.querySelector("#modal");

  const options = {
    input,
    form,
    messageBlock,
    feedsBlock,
    postsBlock,
    popup,
  };
  const state = getWatchedState(initState, options);

  const resetFormData = () => {
    state.form.isValid = true;
    state.loadingProcess.status = 'idle'
    state.loadingProcess.errors = [];
    state.loadingProcess.messages = [];
    state.form.inputValue = "";
  };

  const getDataList = (feedList) => Promise.all(feedList.map((feed) => getRSSData(feed.url)));
  const parsedFeedsList = (xmlList) => xmlList.map(({data, config: {url}}) => {
    const parsedFeed = parseXml(data);
    parsedFeed.feed.url = url;
    return parsedFeed;
  });

  const updateState = (localState, updatesList) => {
    const newPosts = updatesList.reduce((result, updatedFeed) => {
      const newFeedPosts = differenceWith(updatedFeed.posts, localState.posts, isEqual);
      return [...newFeedPosts, ...result];
    }, []);

    if (newPosts.length) {
      localState.posts.unshift(...newPosts);
    }
  };

  const updateFeeds = (localState) => {
    getDataList(localState.feeds)
      .then((xmlList) => {
        const parsedList = parsedFeedsList(xmlList);
        updateState(localState, parsedList);
    });
  };

  const initTimer = timer((currentState) => {
    if (!currentState.feeds.length) return;

    updateFeeds(currentState);
  }, 5000);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.feeds.length) {
      initTimer(state);
    }

    const url = input.value;
    state.loadingProcess.status = 'loading'

    validateUrl(url)
      .then((validUrl) => {

        const isNewFeed = (comparedUrl) => state.feeds.reduce(
          (result, feed) => (
            result && feed.url !== comparedUrl
          ), true
        );

        if (isNewFeed(validUrl)) {
          getRSSData(validUrl)
            .then((rawXml) => {
              const {feed, posts} = parseXml(rawXml.data);
              feed.url = validUrl;

              state.feeds.push(feed);
              state.posts = [...posts, ...state.posts];

              resetFormData();
              updateFeeds(state);
              state.loadingProcess.status = 'success';
              state.loadingProcess.messages = i18next.t("messages.successAdd");
            });
        } else {
          state.form.isValid = false;
          state.loadingProcess.status = 'failed'
          state.loadingProcess.errors.push(i18next.t("error.duplicate"));
        }
      })
      .catch((error) => {
        const { errors } = error;
        state.form.isValid = false;
        state.loadingProcess.status = 'failed'
        state.loadingProcess.errors.push(...errors);
      });
  });

  input.addEventListener("keyup", () => {
    state.form.inputValue = input.value;
  });

  postsBlock.addEventListener("click", ({ target }) => {
    const { id } = target.dataset;
    const isNew = !state.ui.seenPosts.includes(id);
    state.modal.postId=id;

    if (id && isNew) {
      state.ui.seenPosts.push(id);
    }
  });

  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl))

  const example = document.querySelector("#clip-example");
  example.addEventListener("click", (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(example.textContent)
      .then(() => console.log(`Copied to clipboard: ${event.target.textContent}`));
  })

  initLocale();
};

export default application;
