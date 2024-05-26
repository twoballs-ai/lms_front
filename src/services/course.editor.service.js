import axios from "axios";
import { apiLmsUrl, apiUserUrl, typesApiUrl } from "../shared/config";
import api from "./api";

const editCoursePageGetModuleStage = async (module_id) => {
    // console.log(course_id)
    return await api
        .get(apiLmsUrl + "course-chapter-module-stage-list/" + module_id)
}

// const editCoursePageDeleteModuleStage = async (course_id, module_id, data) => {
//     return await api
//         .delete(apiLmsUrl + "module-stage-detail/" + module_id + "/" + data)
// }
// const editCoursePageGetCourse = async (course_id) => {
//     return await api
//         .get(apiLmsUrl + "course-detail/" + course_id)
// }
const editCoursePageGetChapterList = async (course_id) => {
    return await api
        .get(apiLmsUrl + "course-chapter-list/" + course_id)
}
const editCoursePageAddChapter = async (data) => {
    return await api
        .post(apiLmsUrl + "add_chapter_to_course/", data)
}
const editCoursePageDeleteChapter = async (chapter_id) => {
    return await api
        .delete(`${apiLmsUrl}delete-chapter/?chapter_id=${chapter_id}`)
}
const editCoursePageAddModule = async (data) => {
    return await api
        .post(apiLmsUrl + "add_module_to_chapter/", data)
}
const editCoursePageDeleteModule = async (module_id) => {
    return await api
        .delete(`${apiLmsUrl}delete-module/?module_id=${module_id}`)
}
const editCoursePageDeleteStage = async (stage_id) => {
    return await api
        .delete(`${apiLmsUrl}delete-stage/?stage_id=${stage_id}`)
}

const editCoursePageGetClassicLesson = async (stagePk) => {
    return await api
        .get(`${apiLmsUrl}stage/${stagePk}`)
}
const editCoursePageAddClassicLesson = async (data) => {
    return await api
        .post(`${apiLmsUrl}add_stage_to_module/classic_lesson/`, data)
}
const editCoursePageUpdateClassicLesson = async (data) => {
    return await api
        .put(apiLmsUrl + "update/classic_lesson/", data)
}
// const editCoursePageAddVideoLesson = async (stagePk, data) => {
//     return await api
//         .post(typesApiUrl + "video-lesson/" + stagePk, data)
// }
// const editCoursePagePutVideoLesson = async (stagePk, data) => {
//     return await api
//         .put(typesApiUrl + "video-lesson-detail/" + stagePk, data)
// }
// const editCoursePageAddQuizLesson = async (stagePk, data) => {
//     return await api
//         .post(typesApiUrl + "quiz-lesson/" + stagePk, data)
// }
// const editCoursePagePutQuizLesson = async (stagePk, data) => {
//     return await api
//         .put(typesApiUrl + "quiz-lesson-detail/" + stagePk, data)
// }


const CourseEditorService = {
    editCoursePageGetModuleStage,
    // editCoursePageAddModuleStage,
    editCoursePageGetClassicLesson,
    // editCoursePageDeleteModuleStage,
    // editCoursePageGetCourse,
    editCoursePageGetChapterList,
    editCoursePageAddChapter,
    editCoursePageDeleteChapter,
    editCoursePageAddModule,
    editCoursePageDeleteModule,
    editCoursePageAddClassicLesson,
    editCoursePageUpdateClassicLesson,
    editCoursePageDeleteStage,
    // editCoursePageAddVideoLesson,
    // editCoursePagePutVideoLesson,
    // editCoursePageAddQuizLesson,
    // editCoursePagePutQuizLesson
};

export default CourseEditorService;