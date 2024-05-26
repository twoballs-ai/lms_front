import axios from "axios";
import { apiUrl, apiUserUrl } from "../shared/config";
import api from "./api";
// const API_URL = "http://localhost:8080/api/auth/";
import TokenService from "./token.service";

const teacherRegister = async (data) => {
  return await api
    .post(apiUserUrl + "teacher-register/",
      data
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
    )
}
const studentRegister = async (data) => {
  return await api
    .post(apiUserUrl + "student-register/",
      data
    )
}
const login = async (formData) => {
  const response = await api.post(apiUrl + "v1/user/token", formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response;
};


const refreshToken = async () => {
  const response = await api.post(apiUrl + "v1/user/token/refresh", formData, {
    refresh_token : TokenService.getLocalRefreshToken(),
  });
  return response;

}

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
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