import axios from "axios";
import { apiUrl, apiUserUrl } from "../shared/config";
import api from "./api";
import { toast } from "react-toastify";
import TokenService from "./token.service";

type Payload = Record<string, unknown>;

const teacherRegister = async (data: Payload) => {
  return await api.post(`${apiUserUrl}teacher-register/`, data);
};

const studentRegister = async (data: Payload) => {
  return await api.post(`${apiUserUrl}student-register/`, data);
};

const login = async (formData: URLSearchParams | string) => {
  return await api.post(`${apiUrl}v1/user/token`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const refreshToken = async () => {
  const refreshTokenValue = TokenService.getLocalRefreshToken();
  if (!refreshTokenValue) {
    throw new Error("Missing refresh token");
  }

  const formData = new URLSearchParams();
  formData.append("refresh_token", refreshTokenValue);

  try {
    const response = await axios.post(`${apiUrl}v1/user/token/refresh/`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    toast.error("Error refreshing token!");
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const getCurrentUser = () => {
  const rawUser = localStorage.getItem("user");
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

const AuthService = {
  teacherRegister,
  studentRegister,
  login,
  getCurrentUser,
  refreshToken,
};

export default AuthService;
