import { apiStudyUrl, apiUserUrl } from "../shared/config";
import api from "./api";

type Id = number | string | string[];
type Payload = unknown;

const studentCourses = async () => {
  return await api.get(`${apiStudyUrl}student/courses/`);
};

const checkEnrollment = async (courseId: Id) => {
  return await api.get(`${apiStudyUrl}check-enrollment/?course_id=${courseId}`);
};

const learnCoursePageGetChapterList = async (courseId: Id) => {
  return await api.get(`${apiStudyUrl}learning-course-chapter-list/${courseId}`);
};

const getLearnLesson = async (stagePk: Id) => {
  return await api.get(`${apiStudyUrl}stage/${stagePk}`);
};

const enrollToCourse = async (courseId: Id) => {
  return await api.post(`${apiStudyUrl}enroll/${courseId}`);
};

const unenrollStudent = async (courseId: Id) => {
  return await api.delete(`${apiStudyUrl}unenroll/${courseId}`);
};

const unenrollStudentLight = async (courseId: Id) => {
  return await api.patch(`${apiStudyUrl}unenroll/light/${courseId}`);
};

const learnGetModuleStages = async (moduleId: Id) => {
  return await api.get(`${apiStudyUrl}module-stage-list/${moduleId}`);
};

const updateStage = async (stageId: Id, isCompleted: boolean) => {
  return await api.post(`${apiStudyUrl}update_stage_progress/${stageId}/?is_completed=${isCompleted}`);
};

const checkQuizLesson = async (stageId: Id, answers: Payload) => {
  return await api.post(`${apiStudyUrl}check_quiz_answers/${stageId}`, answers);
};

const startExam = async (chapterId: Id) => {
  return await api.post(`${apiStudyUrl}start_exam/${chapterId}`);
};

const completeExam = async (chapterId: Id) => {
  return await api.post(`${apiStudyUrl}complete_exam/${chapterId}`);
};

const chapterStart = async (chapterId: Id) => {
  return await api.patch(`${apiStudyUrl}chapter_patch/${chapterId}`);
};

const updateUserPass = async (data: Payload) => {
  return await api.put(`${apiUserUrl}reset-password`, data);
};

const StudentService = {
  studentCourses,
  updateStage,
  getLearnLesson,
  checkEnrollment,
  enrollToCourse,
  unenrollStudent,
  unenrollStudentLight,
  startExam,
  completeExam,
  learnGetModuleStages,
  checkQuizLesson,
  learnCoursePageGetChapterList,
  updateUserPass,
  chapterStart,
};

export default StudentService;
