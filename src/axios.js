import axios from "axios";

const instance = axios.create({
  baseURL: "https://cenntrum.codecoyapps.com/api",
});

export default instance;
