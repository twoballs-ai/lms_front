import axios from "axios";
import { apiLmsUrl, apiUserUrl, restAuthApiUrl } from "../shared/config";
import api from "./api";

const getCategory = async ({ toSelect }) => {
    return await api.get(apiLmsUrl + "category/", {
        params: {
            to_select: toSelect
        }
    });
}
const homePageNewCourses = async () => {
    return await api
    .get(apiLmsUrl + "courses/?result=4")
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
    homePageNewCourses,
    homePagePopularCourses,
    homePagePopularTeachers,
    homePageStudentsreviews,
    allCoursesPage,
};

export default SiteService;