import axios from "axios";
import { apiLmsUrl,apiStudyUrl, apiUserUrl,  } from "../shared/config";
import api from "./api";
// import authHeader from "./auth-header";

const studentCourses = async () => {
    return await api
        .get(apiStudyUrl + "student/courses/"
        )
}
const checkEnrollment = async (course_id) => {
    return await api
        .get(apiStudyUrl + "check-enrollment/?course_id="+course_id
        )
}
const learnCoursePageGetChapterList = async (course_id) => {
    return await api
        .get(apiStudyUrl + "learning-course-chapter-list/" + course_id)
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
const learnGetModuleStages = async (module_id) => {
    // console.log(course_id)
    return await api
        .get(apiStudyUrl + "module-stage-list/" + module_id)
}
const updateStage = async (stageId, isCompleted) => {
    return await api
        .post(`${apiStudyUrl}update_stage_progress/${stageId}/?is_completed=${isCompleted}`,

            // {headers: { "Content-Type": "multipart/form-data" }}
        )
}

const checkQuizLesson = async (stageId, answers) => {
    return await api
        .post(`${apiStudyUrl}check_quiz_answers/${stageId}`, answers

            // {headers: { "Content-Type": "multipart/form-data" }}
        )
}
// const deleteTeacherCourse = async (courseId) => {
//     return await api
//         .delete(apiLmsUrl + "teacher-courses-detail/" + courseId
//         )
// }

// const teacherStudents = async (teacherId) => {
//     return await api
//         .get(apiLmsUrl + "teacher-students/" + teacherId
//         )
// }
const startExam = async (chapter_id) => {
    return await api
        .post(`${apiStudyUrl}start_exam/${chapter_id}`)
}
const completeExam = async (chapter_id) => {
    return await api
        .post(`${apiStudyUrl}complete_exam/${chapter_id}`)
}

const updateUserPass = async (data) => {
    return await api
        .put(apiUserUrl + "reset-password",data
        )
}

const StudentService = {
    studentCourses,
    updateStage,
    getLearnLesson,
    checkEnrollment,
    enrollToCourse,
    startExam,
    completeExam,
    learnGetModuleStages,
    checkQuizLesson,
    learnCoursePageGetChapterList,
    updateUserPass,
    // deleteTeacherCourse,
    // addCourse,
    // teacherStudents,
};

export default StudentService;