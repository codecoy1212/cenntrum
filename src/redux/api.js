import axios from "axios";

// const API = axios.create({
//   baseURL: "https://cenntrum.codecoyapps.com",
// });
// export const IMAGE_BASE_URL =
//   "https://cenntrum.codecoyapps.com/public/storage/";
const API = axios.create({
  baseURL: "https://wh717090.ispot.cc/cenntrum_live",
});
export const IMAGE_BASE_URL =
  "https://wh717090.ispot.cc/cenntrum_live/public/storage/";

//   API.interceptors.request.use((req) => {
//     if (localStorage.getItem("profile")) {
//       req.headers.Authorization = `Bearer ${
//         JSON.parse(localStorage.getItem("profile")).token
//       }`;
//     }
//     return req;
//   });

export const signIn = (formData) => API.post("/api/web_login", formData);

//user
export const userList = () => API.get("/api/web_users_list");
export const deleteUser = (id) => API.get(`/api/delete_user/${id}`);

// coin pkg
export const coinPkgList = () => API.get("/api/coins_pkg_list");
export const createCoinPkg = (formData) =>
  API.post("/api/add_coins_pkg", formData);

export const updateCoinPkg = (formData, id) =>
  API.post(`/api/update_coins_pkg/${id}`, formData);

export const deleteCoinPkg = (id) => API.get(`/api/delete_coins_pkg/${id}`);

// subscription pkg

export const subsPkgList = () => API.get("/api/subs_pkg_list");
export const createSubsPkg = (formData) =>
  API.post("/api/add_subs_pkg", formData);

export const updateSubsPkg = (formData, id) =>
  API.post(`/api/update_subs_pkg/${id}`, formData);

export const deleteSubsPkg = (id) => API.get(`/api/delete_subs_pkg/${id}`);

// incentive

export const incentiveList = () => API.get("/api/insentive_list");
export const createIncentive = (formData) => {
  return axios({
    method: "post",
    url: "https://cenntrum.codecoyapps.com/api/add_insentive",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  // return API.post("/api/add_insentive", { data: formData });
};

export const updateIncentive = (formData, id) =>
  API.post(`/api/update_incentive/${id}`, formData);
export const deleteIncentive = (id) => API.get(`/api/delete_incentive/${id}`);

// earned points

export const earnedList = () => API.get("/api/earned_points");
export const searchEarned = ({ from, to }) =>
  API.get(`/api/earned_points?from=${from}&to=${to}`);

// exchange slice

export const exchangeList = () => API.get("/api/exchange_points");
export const searchExchange = ({ from, to }) =>
  API.get(`/api/exchange_points?from=${from}&to=${to}`);

// App Setting Slice

export const getSetting = () => API.get("/api/get_setting");
export const updateSetting = (formData) =>
  API.post("/api/update_app", formData);

// update admin

export const updateAdmin = (formData) =>
  API.post("/api/update_admin", formData);

// send mail
export const sendGift = (formData) => API.post("/api/send_mail", formData);
export const sendCrypto = (formData) => API.post("/api/send_mail", formData);

// user points
export const accumulatedPoints = (userId) =>
  API.post(`/api/my_points?user_id=${userId}`);
export const points = (userId) => API.get(`/api/my_rewards?user_id=${userId}`);

// business

export const createBusiness = (formData) =>
  API.post("/api/add_business", formData);

export const businessList = () => API.get("/api/business_list");
export const businessDetail = (id) => API.get(`/api/business_detail/${id}`);
export const deleteBusiness = (id) => API.get(`/api/delete_business/${id}`);
