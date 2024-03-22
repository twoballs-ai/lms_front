import axios from "axios";
import { apiLmsUrl, apiUserUrl, restAuthApiUrl, typesApiUrl } from "../shared/config";
import api from "./api";

const editCoursePageGetModuleStage = async (course_id, module_id) => {
    console.log(course_id)
    return await api
    .get(apiLmsUrl + "module-stage/" + course_id +"/"+module_id)
}
// добавить шаг для модуля
const editCoursePageAddModuleStage = async (course_id, module_id, data) => {
    return await api
    .post(apiLmsUrl + "module-stage/" + course_id +"/"+module_id, data)
}
const editCoursePageDeleteModuleStage = async (course_id, module_id,data) => {
    return await api
    .delete(apiLmsUrl + "module-stage-detail/" + module_id +"/"+data)
}
const editCoursePageGetCourse = async (course_id) => {
    return await api
    .get(apiLmsUrl + "course-detail/" + course_id)
}
const editCoursePageGetChapter = async (course_id) => {
    return await api
    .get(apiLmsUrl + "course-chapter/" + course_id)
}
const editCoursePageAddChapter = async (course_id, data) => {
    return await api
    .post(apiLmsUrl + "course-chapter/" + course_id, data)
}
const editCoursePageDeleteChapter = async (chapter_id) => {
    return await api
    .delete(apiLmsUrl + "chapter/" + chapter_id)
}
const editCoursePageAddModule = async (chapter_id, data) => {
    return await api
    .post(apiLmsUrl + "chapter-module/" + chapter_id, data)
}
const editCoursePageDeleteModule = async (chapter_id, module_id) => {
    return await api
    .delete(apiLmsUrl + "chapter-module-detail/" + chapter_id +"/"+module_id)
}

// добавление уроков немного мудренное.
const editCoursePageAddClassicLesson = async (stagePk, data) => {
    return await api
    .post(typesApiUrl + "classic-lesson/" + stagePk, data)
}
const editCoursePagePutClassicLesson = async (stagePk, data) => {
    return await api
    .put(typesApiUrl + "classic-lesson-detail/" + stagePk, data)
}
const editCoursePageAddVideoLesson = async (stagePk, data) => {
    return await api
    .post(typesApiUrl + "video-lesson/" + stagePk, data)
}
const editCoursePagePutVideoLesson = async (stagePk, data) => {
    return await api
    .put(typesApiUrl + "video-lesson-detail/" + stagePk, data)
}
const editCoursePageAddQuizLesson = async (stagePk, data) => {
    return await api
    .post(typesApiUrl + "quiz-lesson/" + stagePk, data)
}
const editCoursePagePutQuizLesson = async (stagePk, data) => {
    return await api
    .put(typesApiUrl + "quiz-lesson-detail/" + stagePk, data)
}


const CourseEditorService = {
    editCoursePageGetModuleStage,
    editCoursePageAddModuleStage,
    editCoursePageDeleteModuleStage,
    editCoursePageGetCourse,
    editCoursePageGetChapter,
    editCoursePageAddChapter,
    editCoursePageDeleteChapter,
    editCoursePageAddModule,
    editCoursePageDeleteModule,
    editCoursePageAddClassicLesson,
    editCoursePagePutClassicLesson,
    editCoursePageAddVideoLesson,
    editCoursePagePutVideoLesson,
    editCoursePageAddQuizLesson,
    editCoursePagePutQuizLesson
};

export default CourseEditorService;