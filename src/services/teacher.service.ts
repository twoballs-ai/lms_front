import axios from "axios";
import { apiLmsUrl, apiUserUrl } from "../shared/config";
import api from "./api";

// Define interfaces for the data where applicable
export interface CourseData {
  [key: string]: any;
}

export interface ProfileData {
  [key: string]: any;
}

export interface PasswordData {
  [key: string]: any;
}

// Define the return types for the service functions
const teacherDashboard = async (): Promise<any> => {
  return await api.get(apiUserUrl + "teacher/dashboard/");
}

const teacherCourses = async (): Promise<any> => {
  return await api.get(apiLmsUrl + "teacher-courses/");
}

const deleteTeacherCourse = async (courseId: string): Promise<any> => {
  return await api.delete(`${apiLmsUrl}delete-course/${courseId}/`);
}

const addCourse = async (data: FormData): Promise<any> => {
  return await api.post(apiLmsUrl + "course/", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}

const updateCourse = async (course_id: string, data: FormData): Promise<any> => {
  return await api.put(apiLmsUrl + "course/" + course_id, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}

const sentToPublish = async (course_id: string): Promise<any> => {
  return await api.put(apiLmsUrl + `courses/${course_id}/send_for_moderation`);
}

const teacherStudents = async (teacherId: string): Promise<any> => {
  return await api.get(apiLmsUrl + "teacher-students/" + teacherId);
}

const getCourseById = async (courseId: string): Promise<any> => {
  return await api.get(`${apiLmsUrl}course/?course_id=${courseId}`);
}

const getTeacherProfile = async (): Promise<any> => {
  return await api.get(apiUserUrl + "teacher-profile");
}

const updateTeacherProfile = async (data: ProfileData): Promise<any> => {
  return await api.put(apiUserUrl + "teacher-profile-update", data);
}

const updateTeacherPass = async (data: PasswordData): Promise<any> => {
  return await api.put(apiUserUrl + "reset-password", data);
}

const TeacherService = {
  teacherDashboard,
  teacherCourses,
  updateTeacherPass,
  getTeacherProfile,
  updateTeacherProfile,
  deleteTeacherCourse,
  addCourse,
  updateCourse,
  sentToPublish,
  teacherStudents,
  getCourseById,
};

export default TeacherService;
