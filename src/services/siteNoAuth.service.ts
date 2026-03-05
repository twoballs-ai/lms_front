import axios from "axios";
import { apiLmsUrl, apiUserUrl, apiBaseUrl, apiBlogUrl } from "../shared/config";
import api from "./api";

type Id = number | string | string[];

type CoursesParams = Record<string, string | number | boolean | undefined>;

const getCategory = async ({ toSelect }: { toSelect?: boolean }) => {
  return await api.get(`${apiBaseUrl}category/`, {
    params: {
      to_select: toSelect,
    },
  });
};

const getTraineerCategory = async ({ toSelect }: { toSelect?: boolean }) => {
  return await api.get(`${apiBaseUrl}traineer_category/`, {
    params: {
      to_select: toSelect,
    },
  });
};

const getCourse = async (courseId: Id) => {
  return await api.get(`${apiBaseUrl}course/`, {
    params: { course_id: courseId },
  });
};

const getCourses = async (params?: CoursesParams) => {
  console.log(params);
  return await api.get(`${apiBaseUrl}courses-by-cat/`, { params });
};

const getTrainers = async (params?: CoursesParams) => {
  console.log(params);
  return await api.get(`${apiBaseUrl}trainers_by_cat/`, { params });
};

const homePageLastAddedCourses = async ({
  items,
}: {
  items: number | string;
}) => {
  return await api.get(`${apiBaseUrl}recent_courses/`, {
    params: { items },
  });
};

const homePagePopularCourses = async () => {
  return await api.get(`${apiLmsUrl}popular-courses/`, {
    params: { popular: 1 },
  });
};

const homePagePopularTeachers = async () => {
  return await api.get(`${apiUserUrl}popular-teachers/`, {
    params: { popular: 1 },
  });
};

const homePageStudentsreviews = async () => {
  return await api.get(`${apiLmsUrl}student-testimonial/`);
};

const allCoursesPage = async (url: string) => {
  return await api.get(url);
};

const getNewsBlog = async (items?: number | string) => {
  if (items) {
    return await api.get(`${apiBlogUrl}news/`, {
      params: { limit: items },
    });
  }

  return await api.get(`${apiBlogUrl}news/`);
};

const getBlogById = async (id: Id) => {
  return await axios.get(`${apiBlogUrl}news/${id}`);
};

const SiteService = {
  getCategory,
  getTraineerCategory,
  getCourse,
  getCourses,
  getTrainers,
  homePageLastAddedCourses,
  homePagePopularCourses,
  homePagePopularTeachers,
  homePageStudentsreviews,
  allCoursesPage,
  getNewsBlog,
  getBlogById,
};

export default SiteService;