import { normalize, schema } from "normalizr";

const getNormalizedData = (data) => {
  const postSchema = new schema.Entity("post");
  const postsList = [postSchema];
  const rssFeed = new schema.Entity("feed", { postsList });
  const resultData = {
    feed: {},
    posts: {
      ids: [],
      list: {},
    },
  };

  const { result, entities } = normalize(data, rssFeed);
  const { title, description, posts } = entities.feed[result];

  const postReducer = (acc, post) => {
    const normalizedPost = {
      id: post.id,
      title: post.title,
      description: post.description,
      link: post.link,
    };
    return {...acc, [post.id]: normalizedPost}
  }

  resultData.feed = { title, description };
  resultData.posts.list = posts.reduce(postReducer, {});
  resultData.posts.ids = posts.map((post) => post.id);

  return resultData;
};

export default getNormalizedData;
