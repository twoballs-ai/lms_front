import axios from "axios";
import TokenService from "./token.service";
import { restAuthApiUrl } from "../shared/config";
import AuthService from "./auth.service";
import { jwtDecode } from "jwt-decode";
// import UserLogout from "../components/Auth/Logout/Logout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      //   config.headers["x-access-token"] = token; // for Node.js Express back-end
      // console.log(config)
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

      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        // console.log("pipiska")
        try {
          let refreshtoken = TokenService.getLocalRefreshToken()
          // check for refresh token expiration
          let currentTime = new Date().getTime();
          //   console.log(jwtDecode(refreshtoken).exp)
          //   console.log(currentTime/ 1000)
          //   console.log(jwtDecode(refreshtoken).exp < currentTime/ 1000)
          if (jwtDecode(refreshtoken).exp < currentTime / 1000) {

            UserLogout()
          }
          const rs = await instance.post(restAuthApiUrl + "token/refresh/", {
            refresh: TokenService.getLocalRefreshToken(),
          });
          console.log(rs)
          const token = rs.data;
          TokenService.updateLocalAccessToken(token.access);
          TokenService.updateLocalRefreshToken(token.refresh);

          return instance(originalConfig);
        }
        catch (_error) {
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      toast.error(err.response.data.message || 'Произошла ошибка');

    }

    return Promise.reject(err);
  }
);

export default instance;