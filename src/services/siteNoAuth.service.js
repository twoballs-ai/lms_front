import axios from "axios";
import { apiLmsUrl, apiUserUrl,  apiBaseUrl } from "../shared/config";
import api from "./api";

const getCategory = async ({ toSelect }) => {
    return await api.get(apiBaseUrl + "category/", {
        params: {
            to_select: toSelect
        }
    });
}
const homePageLastAddedCourses = async ({ items }) => {
    return await api
    .get(apiBaseUrl + `recent_courses/?items=${items}`)
}
const homePagePopularCourses = async () => {
    return await api
    .get(apiLmsUrl + "popular-courses/?popular=1")
}
const homePagePopularTeachers = async () => {
    return await api
    .get(apiUserUrl + "popular-teachers/?popular=1")
}
const homePageStudentsreviews = async () => {
    return await api
    .get(apiLmsUrl + "student-testimonial/")
}
const allCoursesPage = async (url) => {
    return await api
    .get(url)
}

const SiteService = {
    getCategory,
    homePageLastAddedCourses,
    homePagePopularCourses,
    homePagePopularTeachers,
    homePageStudentsreviews,
    allCoursesPage,
};

export default SiteService;