import { apiLmsUrl, apiUserUrl,  } from "../shared/config";
import api from "./api";
// import authHeader from "./auth-header";
const teacherDashboard = async () => {
    return await api
        .get(apiUserUrl + "teacher/dashboard/"
        )
}
const teacherCourses = async () => {
    return await api
        .get(apiLmsUrl + "teacher-courses/"
        )
}
const deleteTeacherCourse = async (courseId) => {
    return await api
        .delete(`${apiLmsUrl}delete-course/${courseId}/`
        )
}
const archiveTeacherCourse = async (courseId) => {
    return await api
        .delete(`${apiLmsUrl}archive-course/${courseId}/`
        )
}
const addCourse = async (...data) => {
    return await api
        .post(apiLmsUrl + "course/",
        ...data,
            {headers: { "Content-Type": "multipart/form-data" }}
        )
}
const updateCourse = async (course_id, ...data) => {
    return await api
        .put(apiLmsUrl + "course/"+course_id,
        ...data,
            {headers: { "Content-Type": "multipart/form-data" }}
        )
}
const sentToPublish = async (course_id) => {
    return await api
        .put(apiLmsUrl + `courses/${course_id}/send_for_moderation`
        )
}
const teacherStudents = async (teacherId) => {
    return await api
        .get(apiLmsUrl + "teacher-students/" + teacherId
        )
}
const getCourseById = async (courseId) => {
    return await api
        .get(`${apiLmsUrl}course/?course_id=${courseId}`
            // {headers: { "Content-Type": "multipart/form-data" }}
        )
}
const getTeacherProfile = async () => {
    return await api
        .get(apiUserUrl + "teacher-profile"
        )
}
const updateTeacherProfile = async (data) => {
    return await api
        .put(apiUserUrl + "teacher-profile-update",data
        )
}
const updateTeacherPass = async (data) => {
    return await api
        .put(apiUserUrl + "reset-password",data
        )
}
const TeacherService = {
    teacherDashboard,
    teacherCourses,
    updateTeacherPass,
    getTeacherProfile,
    updateTeacherProfile,
    deleteTeacherCourse,
    archiveTeacherCourse,
    addCourse,
    updateCourse,
    sentToPublish,
    teacherStudents,
    getCourseById,
};

export default TeacherService;