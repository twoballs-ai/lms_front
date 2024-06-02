import axios from "axios";
import TokenService from "./token.service";
// import UserLogout from "../components/Auth/Logout/Logout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "./auth.service"
const instance = axios.create({
  //   baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await AuthService.refreshToken();
          const accessToken = rs.access_token;
          TokenService.updateLocalAccessToken(accessToken);
          instance.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken;
          return instance(originalConfig);
        } catch (_error) {
          console.log("errroe ebaniy")
          // AuthService.logout();
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;