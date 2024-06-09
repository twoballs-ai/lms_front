import axios from "axios";
import TokenService from "./token.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "./auth.service";

const instance = axios.create({
  // baseURL: "http://localhost:8080/api",
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
    // Check if response.data.message exists and show success toast
    if (res.data && res.data.message) {
      toast.success(res.data.message);
    }
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      console.log(err.response)
      // Show error toast if response contains an error message
      if (err.response && err.response.statusText) {
        toast.error("Произошла внутренняя ошибка");
      }

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await AuthService.refreshToken();
          const accessToken = rs.access_token;
          TokenService.updateLocalAccessToken(accessToken);
          instance.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken;
          return instance(originalConfig);
        } catch (_error) {
          console.log("Error refreshing token");
          // Show error toast for token refresh failure
          toast.error("Failed to refresh token. Please log in again.");
          // AuthService.logout();
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403) {
        toast.error("You do not have permission to perform this action.");
        return Promise.reject(err.response.data);
      }
    } else {
      // Show a generic error toast if no response is received from the server
      toast.error("Произошла странная ошибка");
    }

    return Promise.reject(err);
  }
);

export default instance;
