import onChange from "on-change";
import renderFeeds from "./render/feeds.js";
import renderPosts from "./render/posts.js";
import renderMessageBlock from "./render/messageBlock.js";
import setStyle from "./helpers/styleSetters.js";

const getWatchState = (state, options) => {
  const { input, messageBlock, feedsBlock, postsBlock } = options;

  return onChange(state, (path, value) => {
    switch (path) {
      case "form.isValid": {
        setStyle(input, { value, classValid: "is-valid", classInvalid: "is-invalid" });
        setStyle(messageBlock, { value, classValid: "text-success", classInvalid: "text-danger" });
        break;
      }
      case "form.messages": {
        renderMessageBlock(messageBlock, value);
        break;
      }
      case "form.inputValue": {
        input.value = value;
        break;
      }
      case "rss.sites": {
        break;
      }
      case "rss.feeds": {
        renderFeeds(feedsBlock, state.rss.feeds);
        break;
      }
      case "rss.posts.list": {
        renderPosts(postsBlock, state.rss.posts);
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default getWatchState;
