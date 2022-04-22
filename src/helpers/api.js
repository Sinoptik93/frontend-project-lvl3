import axios from "axios";

const api = (url) => axios.get(`https://allorigins.hexlet.app/raw?url=${encodeURIComponent(url)}`);

export default api;
