import axios from "axios";
import { apiLmsUrl,apiStudyUrl, apiUserUrl,  } from "../shared/config";
import api from "./api";
// import authHeader from "./auth-header";

const studentCourses = async () => {
    return await api
        .get(apiStudyUrl + "student/courses/"
        )
}

const getLearnLesson = async (stagePk) => {
    return await api
        .get(`${apiStudyUrl}stage/${stagePk}`)
}
const enrollToCourse = async (course_id) => {
    return await api
        .post(`${apiStudyUrl}enroll/${course_id}`,

            // {headers: { "Content-Type": "multipart/form-data" }}
        )
}
// const deleteTeacherCourse = async (courseId) => {
//     return await api
//         .delete(apiLmsUrl + "teacher-courses-detail/" + courseId
//         )
// }
// const addCourse = async (...data) => {
//     return await api
//         .post(apiLmsUrl + "course/",
//         ...data,
//             // {headers: { "Content-Type": "multipart/form-data" }}
//         )
// }
// const teacherStudents = async (teacherId) => {
//     return await api
//         .get(apiLmsUrl + "teacher-students/" + teacherId
//         )
// }




const StudentService = {
    studentCourses,
    getLearnLesson,
    enrollToCourse,
    // deleteTeacherCourse,
    // addCourse,
    // teacherStudents,
};

export default StudentService;