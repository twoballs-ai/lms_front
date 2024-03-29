import axios from "axios";
import { apiLmsUrl, apiUserUrl, restAuthApiUrl } from "../shared/config";
import api from "./api";
// import authHeader from "./auth-header";
const teacherDashboard = async (teacherId) => {
    return await api
    .get(apiUserUrl + "teacher/dashboard/"+ teacherId
    )
}
const teacherCourses = async (teacherId) => {
    return await api
    .get(apiLmsUrl + "teacher-courses/" + teacherId
    )
}
const deleteTeacherCourse = async (courseId) => {
    return await api
    .delete(apiLmsUrl + "teacher-courses-detail/" + courseId
    )
}
const addCourse = async (data) => {
    return await api
    .post(apiLmsUrl + "course/",
    data, {headers: { "Content-Type": "multipart/form-data" }}
    )
}
const teacherStudents = async (teacherId) => {
    return await api
    .get(apiLmsUrl + "teacher-students/" + teacherId
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




const TeacherService = {
    teacherDashboard,
    teacherCourses,
    deleteTeacherCourse,
    addCourse,
    teacherStudents,
};

export default TeacherService;