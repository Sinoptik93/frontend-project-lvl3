import api from "./api.js";

const getContent = (url) => {
  const params = `?disableCache=true&url=${encodeURIComponent(url)}`
  const proxiesUrl = `https://allorigins.hexlet.app/get${params}`;

  return api(proxiesUrl)
    .then((response) => response.data.contents)
};
export default getContent;
