import onChange from "on-change";
import renderFeeds from "./renderFeeds.js";
import renderPosts from "./renderPosts.js";
import renderMessageBlock from "./renderMessageBlock.js";
import renderReadStyle from "./renderReadStyle.js";
import renderPopupContent from "./renderPopupContent.js";
import setStyle from "../helpers/setStyle.js";

const getWatchState = (state, options) => {
  const { input, messageBlock, feedsBlock, postsBlock, popup } = options;

  return onChange(state, (path, value) => {
    switch (path) {
      case "form.isValid": {
        setStyle(input, {
          value,
          classValid: "is-valid",
          classInvalid: "is-invalid",
        });
        setStyle(messageBlock, {
          value,
          classValid: "text-success",
          classInvalid: "text-danger",
        });
        break;
      }
      case "loadingProcess.errors": {
        setStyle(messageBlock, {
          value: false,
          classValid: "text-success",
          classInvalid: "text-danger",
        });
        renderMessageBlock(messageBlock, value);
        break;
      }
      case "loadingProcess.messages": {
        setStyle(messageBlock, {
          value: true,
          classValid: "text-success",
          classInvalid: "text-danger",
        });
        renderMessageBlock(messageBlock, value);
        break;
      }
      case "feeds": {
        renderFeeds(feedsBlock, state.feeds);
        break;
      }
      case "posts": {
        const data = {
          posts: state.posts,
          readList: state.ui.seenPosts,
        }
        renderPosts(postsBlock, data);
        break;
      }
      case "modal.postId": {
        const { postId } = state.modal;

        if (!postId) break;

        renderReadStyle(postId);
        renderPopupContent(popup, state.posts, postId);

        break;
      }
      case "loadingProcess.status": {
        switch (value) {
          case 'idle':
            break;
          case 'loading':
            break;
          case 'success':
            break;
          case 'failed': {
            setStyle(messageBlock, {
              value: false,
              classValid: "text-success",
              classInvalid: "text-danger",
            });
            break;
          }
          default:
            break;
        }

        break;
      }
      default:
        break;
    }
  });
};

export default getWatchState;
