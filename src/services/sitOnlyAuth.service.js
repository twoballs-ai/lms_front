import axios from "axios";
import { apiLmsUrl, apiUserUrl,  apiBaseUrl } from "../shared/config";
import api from "./api";
const getTeacherProfile = async () => {
    return await api
        .get(apiUserUrl + "teacher-profile"
        )
}
const SiteOnlyAuthService = {
    getTeacherProfile,
};

export default SiteOnlyAuthService;