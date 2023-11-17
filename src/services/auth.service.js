import axios from "axios";
import { apiUserUrl, restAuthApiUrl } from "../shared/config";
import api from "./api";
// const API_URL = "http://localhost:8080/api/auth/";

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

const login = async (data) => {
  const response = await api
        .post(restAuthApiUrl + "login/", data,);
    // if (response.data.accessToken) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
        
    // }
    return response;
};

// const { data } = await axios.post(restAuthApiUrl + "login/", allProfilesLoginData, { headers: { "Content-Type": "multipart/form-data" } });

const logout = () => {
  localStorage.clear();
  window.location.href='/';
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
};

export default AuthService;