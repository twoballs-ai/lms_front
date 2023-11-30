import axios from "axios";
import { apiLmsUrl, apiUserUrl, restAuthApiUrl } from "../shared/config";
import api from "./api";

const editCoursePageGetModuleStage = async (module_id) => {
    return await api
    .get(apiLmsUrl + "module-stage/" + module_id)
}
// добавить шаг для модуля
const editCoursePageAddModuleStage = async (module_id, data) => {
    return await api
    .post(apiLmsUrl + "module-stage/" + module_id, data)
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

const editCoursePageAddModule = async (chapter_id, data) => {
    return await api
    .post(apiLmsUrl + "chapter-module/" + chapter_id, data)
}

const CourseEditorService = {
    editCoursePageGetModuleStage,
    editCoursePageAddModuleStage,
    editCoursePageGetCourse,
    editCoursePageGetChapter,
    editCoursePageAddChapter,
    editCoursePageAddModule,
};

export default CourseEditorService;