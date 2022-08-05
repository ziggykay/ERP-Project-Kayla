import axios from "axios";
import store from "../store"
import base_url from "../../"
const token = store.getters['auth/getToken']

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  function (error) {
    return Promise.reject(error);
  }
})

instance.interceptors.request.use(
  function (config) {
  // Do something before request is sent
	// 會員系統需驗證身份時
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// 任何 HTTP status code 為 2xx 開頭時觸發此函式
    return response;
  }, 
	function (error) {
		// 任何 HTTP status code 非 2xx 開頭時觸發此函式
    return Promise.reject(error.response);
});


axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          console.log("驗證過期");
          break;
        case 404:
          console.log("找不到該頁面");
          break;
        case 500:
          console.log("伺服器出錯");
          break;
        case 503:
          console.log("服務失效");
          break;
        default:
          console.log(`連接錯誤${err.response.status}`);
      }
    } else {
      console.log("連接到服務器失敗");
    }
    return Promise.resolve(err.response);
  }
);