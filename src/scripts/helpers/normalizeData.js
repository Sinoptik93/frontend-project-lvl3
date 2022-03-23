import { normalize, schema } from "normalizr";
import initIdGenerator from "./initIdGenerator.js";

const getPostId = initIdGenerator();

const initNormalizer = (data) => {
  const postSchema = new schema.Entity("post");
  const postsList = [postSchema];
  const rssFeed = new schema.Entity("feed", { postsList });
  const resultData = {
    feed: {
      ids: [],
      list: {},
    },
    posts: {
      ids: [],
      list: {},
    },
  };

  const { result, entities } = normalize(data, rssFeed);
  const { id, title, description, posts } = entities.feed[result];

  resultData.feed.ids.push(result);
  resultData.feed.list = {
    ...resultData.feed.list,
    [result]: { id, title, description },
  };

  const normalizedPostsList = posts.reduce((acc, post) => {
    const postId = getPostId();
    const normalizedPost = {
      id: postId,
      guid: post.guid,
      title: post.title,
      description: post.description,
      link: post.link,
      state: "default",
    };
    return { ...acc, [postId]: normalizedPost };
  }, {});

  const normalizedPostsIds = Object.keys(normalizedPostsList);

  resultData.posts.ids = normalizedPostsIds;
  resultData.posts.list = normalizedPostsList;

  return resultData;
};

export default initNormalizer;
