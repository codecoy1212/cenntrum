import axios from "axios";

const instance = axios.create({
  baseURL: "https://wh717090.ispot.cc/cenntrum_live/api",
});
// baseURL: "https://cenntrum.codecoyapps.com/api",

export default instance;
