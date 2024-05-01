import axios from "axios";
import { apiUrl, apiUserUrl, restAuthApiUrl } from "../shared/config";
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
const login = async (formData) => {
  const response = await api.post(apiUrl + "v1/user/token", formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response;
};
// const login = async (data) => {
//   console.log(data)
//   const response = await api
//     .post(apiUrl + "v1/user/token", data);
//   // if (response.data.accessToken) {
//   //     localStorage.setItem("user", JSON.stringify(response.data));

//   // }
//   return response;
// };

// const { data } = await axios.post(restAuthApiUrl + "login/", allProfilesLoginData, { headers: { "Content-Type": "multipart/form-data" } });

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};



const AuthService = {
  teacherRegister,
  studentRegister,
  login,
  logout,

};

export default AuthService;