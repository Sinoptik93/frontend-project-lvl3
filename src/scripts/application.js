import i18next from "i18next";
import { isEqual, differenceWith } from "lodash";
import validateUrl from "./helpers/validate.js";
import getRSSData from "./helpers/api.js";
import getWatchedState from "./render.js";
import parseXml from "./helpers/parseXml.js";
import getNormalizedData from "./helpers/normalizeData.js";
import timer from "./helpers/timer.js";

const application = () => {
  const initState = {
    form: {
      inputValue: "",
      isValid: null,
      messages: [],
    },
    rss: {
      sites: [],
      feeds: [],
      posts: {
        ids: [],
        list: {},
        read: [],
      },
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
    state.form.messages = [];
    state.form.inputValue = "";
  };

  input.addEventListener("keyup", () => {
    state.form.inputValue = input.value;
  });

  postsBlock.addEventListener("click", ({target}) => {
    const { id } = target.dataset;
    const isNew = !state.rss.posts.read.includes(id);

    if (id && isNew) {
      state.rss.posts.read.push(id);
    }
  })

  const getDataList = (urlsList) =>
    Promise.all(urlsList.map((url) => getRSSData(url)));
  const parseDataList = (xmlList) => xmlList.map((xml) => parseXml(xml.data));
  const normalizeDataList = (dataList) =>
    dataList.map((data) => getNormalizedData(data));

  const updateState = (localState, updatesList) => {
    const updatedPostList = updatesList.reduce(
      (acc, { posts }) => ({ ...acc, ...posts.list }),
      {}
    );
    const updatedPostsIds = updatesList.reduce(
      (acc, { posts }) => [...posts.ids, ...acc],
      []
    );

    const newPostsIds = differenceWith(
      updatedPostsIds,
      localState.rss.posts.ids,
      isEqual
    );
    const newPostsList = newPostsIds.reduce(
      (acc, id) => ({ ...acc, [id]: updatedPostList[id] }),
      {}
    );

    const updatedFeedList = updatesList.reduce(
      (acc, { feed }) => [feed, ...acc],
      []
    );
    const newFeed = differenceWith(
      updatedFeedList,
      localState.rss.feeds,
      isEqual
    );

    if (newFeed.length) {
      localState.rss.feeds = [...newFeed, ...localState.rss.feeds];
    }

    if (newPostsIds.length) {
      localState.rss.posts.ids = [...newPostsIds, ...localState.rss.posts.ids];
      localState.rss.posts.list = {
        ...newPostsList,
        ...localState.rss.posts.list,
      };
    }
  };

  const updateFeeds = (localState) => {
    getDataList(localState.rss.sites).then((xmlList) => {
      const parsedList = parseDataList(xmlList);
      const normalizedList = normalizeDataList(parsedList);
      updateState(localState, normalizedList);
    });
  }

  const initTimer = timer((currentState) => {
    updateFeeds(currentState);
  }, 5000);

  initTimer(state);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const url = input.value;

    validateUrl(url)
      .then((validUrl) => {
        const isNewItem = (link) => !state.rss.sites.includes(link);

        if (isNewItem(validUrl)) {
          state.rss.sites.push(url);
          resetFormData();

          updateFeeds(state);
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
