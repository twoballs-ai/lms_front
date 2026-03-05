import { apiLmsUrl, apiUserUrl } from "../shared/config";
import api from "./api";

type Id = number | string | string[];
type Payload = unknown;

const teacherDashboard = async () => {
  return await api.get(`${apiUserUrl}teacher/dashboard/`);
};

const teacherCourses = async () => {
  return await api.get(`${apiLmsUrl}teacher-courses/`);
};

const deleteTeacherCourse = async (courseId: Id) => {
  return await api.delete(`${apiLmsUrl}delete-course/${courseId}/`);
};

const archiveTeacherCourse = async (courseId: Id) => {
  return await api.delete(`${apiLmsUrl}archive-course/${courseId}/`);
};

const addCourse = async (data: Payload) => {
  return await api.post(`${apiLmsUrl}course/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const updateCourse = async (courseId: Id, data: Payload) => {
  return await api.put(`${apiLmsUrl}course/${courseId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const sentToPublish = async (courseId: Id) => {
  return await api.put(`${apiLmsUrl}courses/${courseId}/send_for_moderation`);
};

const teacherStudents = async (teacherId: Id) => {
  return await api.get(`${apiLmsUrl}teacher-students/${teacherId}`);
};

const getCourseById = async (courseId: Id) => {
  return await api.get(`${apiLmsUrl}course/?course_id=${courseId}`);
};

const getTeacherProfile = async () => {
  return await api.get(`${apiUserUrl}teacher-profile`);
};

const updateTeacherProfile = async (data: Payload) => {
  return await api.put(`${apiUserUrl}teacher-profile-update`, data);
};

const updateTeacherPass = async (data: Payload) => {
  return await api.put(`${apiUserUrl}reset-password`, data);
};

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
