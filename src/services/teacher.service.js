import axios from "axios";
import { apiUserUrl, restAuthApiUrl } from "../shared/config";
import api from "./api";
// import authHeader from "./auth-header";
const teacherDashboard = async (teacherId) => {
    return await api
    .get(apiUserUrl + "teacher/dashboard/"+ teacherId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
    )
}


// try {
//     axios
//         .get(
//             apiUserUrl + "teacher/dashboard/" + teacherId, { headers: authHeader() }
//             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
//             // ,{headers: { "Content-Type": "multipart/form-data" }}
//         )
//         .then((response) => {
//             setDashboardData(response.data);
//             console.log(response.data);
//         });
// } catch (e) {
//     console.log(e);
// }
const studentRegister = async (data) => {
  return await axios
  .post(apiUserUrl + "student-register/",
  data
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
  )
}

const login = async (data) => {
const response = await axios
    .post(restAuthApiUrl + "login/", data,);
// if (response.data.accessToken) {
//     localStorage.setItem("user", JSON.stringify(response.data));
    
// }
return response;
};

// const { data } = await axios.post(restAuthApiUrl + "login/", allProfilesLoginData, { headers: { "Content-Type": "multipart/form-data" } });

const logout = () => {
localStorage.removeItem("user");
};

const getCurrentUser = () => {
return JSON.parse(localStorage.getItem("user"));
};

const TeacherService = {
    teacherDashboard,

};

export default TeacherService;