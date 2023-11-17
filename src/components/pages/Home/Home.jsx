import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { apiLmsUrl } from "../../../shared/config";
import { apiUserUrl } from "../../../shared/config";

import NewAddedCourse from "./HomeComponents/NewAddedCourse";

import HomeTeacherPopular from "./HomeComponents/HomeTeacherPopular";
import HomePopularCourses from "./HomeComponents/HomePopularCourses";
import StudentTestimonials from "./HomeComponents/StudentTestiomonials";
import SiteService from "../../../services/site.service";

function Home() {
    const [allCourseData, setAllCourseData] = useState([]);
    const [popularCourseData, setPopularCourseData] = useState([]);
    const [popularTeacherData, setPopularTeacherData] = useState([]);
    const [studentTestimonialData, setStudentTestimonialData] = useState([]);

    const teacherId = localStorage.getItem("teacherId");
    // console.log(teacherId)
    useEffect(() => {
        const fetchData = async () => {
            await SiteService.homePageNewCourses().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setAllCourseData(response.data.results);
                }
            });
            await SiteService.homePagePopularCourses().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setPopularCourseData(response.data);
                }
            });
            await SiteService.homePagePopularTeachers().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setPopularTeacherData(response.data);
                }
            });
            await SiteService.homePageStudentsreviews().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setStudentTestimonialData(response.data);
                }
            });
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="mx-3">
                <NewAddedCourse allCourseData={allCourseData} />
                {/* popular courses */}
                <HomePopularCourses popularCourseData={popularCourseData} />
                <HomeTeacherPopular popularTeacherData={popularTeacherData} />
               <StudentTestimonials studentTestimonialData={studentTestimonialData} />
            </div>
        </>
    );
}

export default Home;
