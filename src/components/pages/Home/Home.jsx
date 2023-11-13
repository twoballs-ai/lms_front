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

function Home() {
    const [allCourseData, setAllCourseData] = useState([]);
    const [popularCourseData, setPopularCourseData] = useState([]);
    const [popularTeacherData, setPopularTeacherData] = useState([]);
    const [studentTestimonialData, setStudentTestimonialData] = useState([]);

    const teacherId = localStorage.getItem("teacherId");
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiLmsUrl + "course/?result=4"
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setAllCourseData(response.data.results);
                console.log(response.data);
            });
        try {
            axios
                .get(
                    apiLmsUrl + "popular-courses/?popular=1"
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setPopularCourseData(response.data);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiUserUrl + "popular-teachers/?popular=1"
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setPopularTeacherData(response.data);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios
                .get(
                    apiLmsUrl + "student-testimonial/"
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setStudentTestimonialData(response.data);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <div className="mx-3">
                <NewAddedCourse allCourseData={allCourseData} />
                {/* popular courses */}
                <HomePopularCourses popularCourseData={popularCourseData} />
                {/* <HomeTeacherPopular popularTeacherData={popularTeacherData} /> */}
               <StudentTestimonials studentTestimonialData={studentTestimonialData} />
            </div>
        </>
    );
}

export default Home;
