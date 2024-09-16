import { apiLmsUrl} from "../shared/config";
import api from "./api";

const editCoursePageGetModuleStage = async (module_id) => {
    // console.log(course_id)
    return await api
        .get(apiLmsUrl + "module-stage-list/" + module_id)
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
const editCoursePageUpdateChapter = async (chapterId, data) => {
    return await api
        .put(apiLmsUrl + `update-chapter/${chapterId}`, data)
}
const editCourseUpdateChapterSortIndexes = async (course_id, chapters) => {
    return await api
        .put(`${apiLmsUrl}update_chapters_sort_indexes/${course_id}`, chapters);
}
const editCoursePageDeleteChapter = async (chapter_id) => {
    return await api
        .delete(`${apiLmsUrl}delete-chapter/?chapter_id=${chapter_id}`)
}
const editCoursePageAddModule = async (data) => {
    return await api
        .post(apiLmsUrl + "add_module_to_chapter/", data)
}
const editCoursePageUpdateModule = async (moduleId, data) => {
    return await api
        .put(apiLmsUrl + `update-module/${moduleId}`, data)
}
const editCourseUpdateModuleSortIndexes = async (chapter_id, modules) => {
    return await api
        .put(`${apiLmsUrl}update_modules_sort_indexes/${chapter_id}`, modules);
}
const editCoursePagePatchModule = async (moduleId, data) => {
    return await api
        .patch(apiLmsUrl + `patch-module/${moduleId}`, data)
}
const editCoursePageDeleteModule = async (module_id) => {
    return await api
        .delete(`${apiLmsUrl}delete-module/?module_id=${module_id}`)
}
const editCoursePageDeleteStage = async (stage_id) => {
    return await api
        .delete(`${apiLmsUrl}delete-stage/${stage_id}`)
}
const editCourseUpdateStageSortIndexes = async (moduleId, stages) => {
    return await api.put(`${apiLmsUrl}update_stages_sort_indexes/${moduleId}`, stages);
}
const editCoursePageGetLesson = async (stagePk) => {
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
const editCoursePageAddVideoLesson = async (data) => {
    return await api
        .post(`${apiLmsUrl}add_stage_to_module/video_lesson/`, data)
}
const editCoursePageUpdateVideoLesson = async (data) => {
    return await api
    .put(apiLmsUrl + "update/video_lesson/", data)
}
const editCoursePageAddQuizLesson = async (data) => {
    return await api
        .post(`${apiLmsUrl}add_stage_to_module/quiz_lesson/`, data)
}
const editCoursePageUpdateQuizLesson = async (data) => {
    return await api
    .put(apiLmsUrl + "update/quiz_lesson/", data)
}


const CourseEditorService = {
    editCoursePageGetModuleStage,
    // editCoursePageAddModuleStage,
    editCoursePageGetLesson,
    editCoursePagePatchModule,

    // editCoursePageDeleteModuleStage,
    // editCoursePageGetCourse,
    editCoursePageGetChapterList,
    editCoursePageAddChapter,
    editCoursePageUpdateChapter,
    editCourseUpdateChapterSortIndexes,
    editCoursePageDeleteChapter,
    editCoursePageAddModule,
    editCoursePageUpdateModule,
    editCourseUpdateModuleSortIndexes,
    editCourseUpdateStageSortIndexes,
    editCoursePageDeleteModule,
    editCoursePageAddClassicLesson,
    editCoursePageUpdateClassicLesson,
    editCoursePageDeleteStage,
    editCoursePageAddVideoLesson,
    editCoursePageUpdateVideoLesson,
    editCoursePageAddQuizLesson,
    editCoursePageUpdateQuizLesson
};

export default CourseEditorService;