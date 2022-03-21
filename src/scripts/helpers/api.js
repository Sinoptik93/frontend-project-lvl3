const getRSSData = (url) =>
  fetch(url)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"));

export default getRSSData;
