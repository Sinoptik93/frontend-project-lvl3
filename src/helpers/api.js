import axios from "axios";

const api = (url) => axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`);

export default api;
