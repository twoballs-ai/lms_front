import axios from "axios";
import TokenService from "./token.service"; // Assuming TokenService is adapted for SSR
import AuthService from "./auth.service";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for requests
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      console.log(err.response);

      // Handling 401 Unauthorized errors
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await AuthService.refreshToken();
          const accessToken = rs.access_token;
          
          if (typeof window !== 'undefined') {
            TokenService.updateLocalAccessToken(accessToken);
          }

          instance.defaults.headers.common["Authorization"] = 'Bearer ' + accessToken;
          return instance(originalConfig);
        } catch (_error) {
          console.log("Error refreshing token. Please log in again.");
          // You can redirect to the login page or return a custom error message here
          return Promise.reject(_error);
        }
      }

      // Handle 403 Forbidden errors
      if (err.response.status === 403) {
        console.error("You do not have permission to perform this action.");
        return Promise.reject(err.response.data);
      }
    } else {
      // Generic error handling
      console.error("An unexpected error occurred.");
    }

    return Promise.reject(err);
  }
);

export default instance;
