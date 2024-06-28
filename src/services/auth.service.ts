import axios from "axios";
import { apiUrl, apiUserUrl } from "../shared/config";
import api from "./api";
import TokenService from "./token.service";
import { UserData, AuthResponse, RegisterData, LoginFormData } from "./auth.service.types";

const teacherRegister = async (data: RegisterData): Promise<any> => {
  console.log(data);
  return await api.post(`${apiUserUrl}teacher-register/`, data);
};

const studentRegister = async (data: RegisterData): Promise<any> => {
  return await api.post(`${apiUserUrl}student-register/`, data);
};

const login = async (formData: FormData): Promise<AuthResponse> => {
  console.log("ss")
  return await api.post(`${apiUrl}v1/user/token`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

};

const refreshToken = async (): Promise<any> => {
  const refresh_token = TokenService.getLocalRefreshToken();
  const formData = new URLSearchParams();
  formData.append('refresh_token', refresh_token);

  try {
    const response = await axios.post(`${apiUrl}v1/user/token/refresh/`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const logout = (): void => {
  localStorage.clear();
  window.location.href = '/';
};

const getCurrentUser = (): UserData | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AuthService = {
  teacherRegister,
  studentRegister,
  login,
  logout,
  getCurrentUser,
  refreshToken,
};

export default AuthService;
