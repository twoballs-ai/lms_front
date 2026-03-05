import { apiLmsUrl } from "../shared/config";
import api from "./api";

type Id = number | string | string[];
type SortableItem = { id: Id; sort_index: number };
type Payload = unknown;

const editCoursePageGetModuleStage = async (moduleId: Id) => {
  return await api.get(`${apiLmsUrl}module-stage-list/${moduleId}`);
};

const editCoursePageGetChapterList = async (courseId: Id) => {
  return await api.get(`${apiLmsUrl}course-chapter-list/${courseId}`);
};

const editCoursePageAddChapter = async (data: Payload) => {
  return await api.post(`${apiLmsUrl}add_chapter_to_course/`, data);
};

const editCoursePageUpdateChapter = async (chapterId: Id, data: Payload) => {
  return await api.put(`${apiLmsUrl}update-chapter/${chapterId}`, data);
};

const editCourseUpdateChapterSortIndexes = async (courseId: Id, chapters: SortableItem[]) => {
  return await api.put(`${apiLmsUrl}update_chapters_sort_indexes/${courseId}`, chapters);
};

const editCoursePageDeleteChapter = async (chapterId: Id) => {
  return await api.delete(`${apiLmsUrl}delete-chapter/?chapter_id=${chapterId}`);
};

const editCoursePageAddModule = async (data: Payload) => {
  return await api.post(`${apiLmsUrl}add_module_to_chapter/`, data);
};

const editCoursePageUpdateModule = async (moduleId: Id, data: Payload) => {
  return await api.put(`${apiLmsUrl}update-module/${moduleId}`, data);
};

const editCourseUpdateModuleSortIndexes = async (chapterId: Id, modules: SortableItem[]) => {
  return await api.put(`${apiLmsUrl}update_modules_sort_indexes/${chapterId}`, modules);
};

const editCoursePagePatchModule = async (moduleId: Id, data: Payload) => {
  return await api.patch(`${apiLmsUrl}patch-module/${moduleId}`, data);
};

const editCoursePageDeleteModule = async (moduleId: Id) => {
  return await api.delete(`${apiLmsUrl}delete-module/?module_id=${moduleId}`);
};

const editCoursePageDeleteStage = async (stageId: Id) => {
  return await api.delete(`${apiLmsUrl}delete-stage/${stageId}`);
};

const editCourseUpdateStageSortIndexes = async (moduleId: Id, stages: SortableItem[]) => {
  return await api.put(`${apiLmsUrl}update_stages_sort_indexes/${moduleId}`, stages);
};

const editCoursePageGetLesson = async (stagePk: Id) => {
  return await api.get(`${apiLmsUrl}stage/${stagePk}`);
};

const editCoursePageAddClassicLesson = async (data: Payload) => {
  return await api.post(`${apiLmsUrl}add_stage_to_module/classic_lesson/`, data);
};

const editCoursePageUpdateClassicLesson = async (data: Payload) => {
  return await api.put(`${apiLmsUrl}update/classic_lesson/`, data);
};

const editCoursePageAddVideoLesson = async (data: Payload) => {
  return await api.post(`${apiLmsUrl}add_stage_to_module/video_lesson/`, data);
};

const editCoursePageUpdateVideoLesson = async (data: Payload) => {
  return await api.put(`${apiLmsUrl}update/video_lesson/`, data);
};

const editCoursePageAddQuizLesson = async (data: Payload) => {
  return await api.post(`${apiLmsUrl}add_stage_to_module/quiz_lesson/`, data);
};

const editCoursePageUpdateQuizLesson = async (data: Payload) => {
  return await api.put(`${apiLmsUrl}update/quiz_lesson/`, data);
};

const CourseEditorService = {
  editCoursePageGetModuleStage,
  editCoursePageGetLesson,
  editCoursePagePatchModule,
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
  editCoursePageUpdateQuizLesson,
};

export default CourseEditorService;
