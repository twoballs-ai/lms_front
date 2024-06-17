import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import { apiLmsUrl } from "../../../shared/config";
import { apiUserUrl } from "../../../shared/config";
import "./Home.scss"
import NewAddedCourse from "./HomeComponents/NewAddedCourse";

import HomeTeacherPopular from "./HomeComponents/HomeTeacherPopular";
import HomePopularCourses from "./HomeComponents/HomePopularCourses";
import StudentTestimonials from "./HomeComponents/StudentTestiomonials";
import SiteService from "../../../services/siteNoAuth.service";

export default function Home() {
    const [lastAddedCourses, setlastAddedCourses] = useState([]);
    const [popularCourseData, setPopularCourseData] = useState([]);
    const [popularTeacherData, setPopularTeacherData] = useState([]);
    const [studentTestimonialData, setStudentTestimonialData] = useState([]);

    const teacherId = localStorage.getItem("teacherId");

    const items ="8"
    useEffect(() => {
        const fetchData = async () => {
            await SiteService.homePageLastAddedCourses({items}).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setlastAddedCourses(response.data.data);
                }
            });
            // await SiteService.homePagePopularCourses().then((response) => {
            //     if (response.status === 200 || response.status === 201) {
            //         setPopularCourseData(response.data);
            //     }
            // });
            // await SiteService.homePagePopularTeachers().then((response) => {
            //     if (response.status === 200 || response.status === 201) {
            //         setPopularTeacherData(response.data);
            //     }
            // });
            // await SiteService.homePageStudentsreviews().then((response) => {
            //     if (response.status === 200 || response.status === 201) {
            //         setStudentTestimonialData(response.data);
            //     }
            // });
        };
        fetchData();
    }, []);
    // console.log("sds")
    return (
        <>
            <div className="main-container__home-container">
            <p>Недавно добавленные курсы</p>
            <NewAddedCourse lastAddedCourses={lastAddedCourses}/>
            <p>Популярные курсы</p>
            </div>

           

            {/* popular courses */}
            {/* <HomePopularCourses popularCourseData={popularCourseData} /> */}
            {/* <HomeTeacherPopular popularTeacherData={popularTeacherData} />
            <StudentTestimonials studentTestimonialData={studentTestimonialData} /> */}

        </>
    );
}


