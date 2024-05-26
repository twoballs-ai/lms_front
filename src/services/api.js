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

        try {
          const rs = await AuthService.refreshToken();
          const { accessToken } = rs.data;
          const token = rs.data;
          const currentTime = new Date().getTime();
          //   console.log(jwtDecode(refreshtoken).exp)
          //   console.log(currentTime/ 1000)
          //   console.log(jwtDecode(refreshtoken).exp < currentTime/ 1000)
          if (jwtDecode(token.refresh).exp < currentTime / 1000) {

            UserLogout()
          }
          TokenService.updateLocalAccessToken(token.access);
          TokenService.updateLocalRefreshToken(token.refresh);
          instance.defaults.headers.common["x-access-token"] = accessToken;

          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);



export default instance;