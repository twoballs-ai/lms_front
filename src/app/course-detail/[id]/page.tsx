'use client'; // Указание на клиентский компонент

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Используем useRouter вместо useNavigate
import { Badge, Tooltip } from 'antd';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { apiBaseUrl, apiUrl, serverUrl } from "../../../shared/config";

import SiteService from "../../../services/siteNoAuth.service";
import ImageViewer from "../../../components/reUseComponents/ImageViewer";
import LmsButton from "../../../components/reUseComponents/Button";
import StudentService from "../../../services/student.service";
import "./CourseDetail.scss"

function CourseDetail() {
    const router = useRouter();
    const params = useParams();
    const course_id = params.id; // Получение course_id через useParams Next.js

    const [show, setShow] = useState(false);
    const [showRate, setShowRate] = useState(false);
    const [courseData, setCourseData] = useState([]);
    const [firstModuleData, setFirstModuleData] = useState([]);
    const [relatedCourseData, setRelatedCourseData] = useState([]);
    const [technologicalListData, setTechnologicalListData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [userLoggedStatus, setUserLoggedStatus] = useState("");
    const [enrollStatus, setEnrollStatus] = useState("");
    const [courseViews, setCourseViews] = useState(0);
    const [ratingStatus, setRatingStatus] = useState("");
    const [avgRatingStatus, setAvgRatingStatus] = useState("");
    const [favoriteStatus, setFavoriteStatus] = useState("");
    const [studentId, setStudentId] = useState(null); // Добавляем состояние для studentId
    const [ratingData, setRatingData] = useState({
        rating: "1",
        review: "",
    });

    // Получение studentId только на клиенте
    useEffect(() => {
        const storedStudentId = localStorage.getItem("studentId");
        setStudentId(storedStudentId);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await SiteService.getCourse(course_id).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    if (response.data.data.length !== 0) {
                        setCourseData(response.data.data);
                        console.log(response.data.data);
                    }
                }
            });
        };

        fetchData();

        const studentLoginStatus = JSON.parse(localStorage.getItem("studentLoginStatus"));
        if (studentLoginStatus === "true") {
            setUserLoggedStatus("success");

            const fetchAuthData = async () => {
                try {
                    const response = await StudentService.checkEnrollment(course_id);
                    if (response.status === 200 || response.status === 201) {
                        setEnrollStatus(response.data.enrolled_status);
                    }
                } catch (error) {
                    console.error("Failed to fetch enrollment status:", error);
                }
            };

            fetchAuthData();
        }
    }, [course_id]);

    useEffect(() => {
        if (courseData && courseData.title) {
            document.title = `${courseData.title} - courserio.ru`;
        }
    }, [courseData]);

    const enrollCourse = async () => {
        await StudentService.enrollToCourse(course_id).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setEnrollStatus(response.data.enrolled_status);
            }
        });
    };

    const unsubscribeFromCourse = async () => {
        await StudentService.unenrollStudentLight(course_id).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setEnrollStatus("not enrolled");
            }
        });
    };

    const handlePassingCourseClick = async () => {
        router.push(`/course-learning/${course_id}/learning`); // Навигация через router.push
    };

    const handleChange = (event) => {
        setRatingData({
            ...ratingData,
            [event.target.name]: event.target.value,
        });
    };

    const ratingSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post(
                    `${apiUrl}course-rating/${course_id}`,
                    {
                        rating: ratingData.rating,
                        review: ratingData.review,
                        student: studentId, // Используем состояние studentId
                        course: course_id,
                    },
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        window.location.reload();
                    }
                });
        } catch (error) {
            console.error("Error submitting rating", error);
        }
    };

    const addToFavorite = () => {
        try {
            axios
                .post(
                    `${apiUrl}add-favorite-courses/`,
                    {
                        student: studentId, // Используем состояние studentId
                        course: course_id,
                        is_favorite: true,
                    },
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        setFavoriteStatus("success");
                    }
                });
        } catch (error) {
            console.error("Error adding to favorite", error);
        }
    };

    const removeFromFavorite = () => {
        try {
            axios
                .get(
                    `${apiUrl}remove-favorite-courses/${studentId}/${course_id}`,
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        setFavoriteStatus("");
                    }
                });
        } catch (error) {
            console.error("Error removing from favorite", error);
        }
    };

    return (
        <div className="main-container__course-detail">
            <div className="course-detail__course-info">
                <div className="course-info__image_wrap">
                    <ImageViewer
                        src={`${serverUrl}/${courseData.cover_path}`}
                        alt={courseData.cover_image_name}
                        width={400}
                    />
                </div>
                <div className="course-info__info_wrap">
                    <h1>Курс: {courseData.title}</h1>
                    <h3>Описание: {courseData.description}</h3>
                    <p>
                        Автор курса:{" "}
                        <a href={courseData.teacher ? `/teacher-detail/${courseData.teacher.id}` : '#'}>
                            {courseData.teacher ? `${courseData.teacher.name} ${courseData.teacher.lastname}` : 'Loading...'}
                        </a>
                    </p>
                    <p>Всего подписавшихся пользователей: {courseData.course_subscription}</p>
                    <div className="info-wrap__enrol-buttons">
                        {userLoggedStatus === "success" && (
                            <>
                                {enrollStatus === "enrolled" ? (
                                    <>
                                        <LmsButton
                                            buttonText="Проходить курс"
                                            handleClick={handlePassingCourseClick}
                                        />
                                        <span> Вы подписаны на курс и можете проходить его</span>
                                        <LmsButton
                                            buttonText="Отписаться от курса"
                                            handleClick={unsubscribeFromCourse}
                                        />
                                        <span> Вы не потеряете ваш прогресс, просто перестанете получать оповещения по курсу</span>
                                    </>
                                ) : (
                                    <LmsButton
                                        buttonText="Подписаться на курс"
                                        handleClick={enrollCourse}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="course-detail__similar-courses">
                <hr />
                <h3>Схожие курсы:</h3>
                <p>В разработке</p>
            </div>
        </div>
    );
}

export default CourseDetail;
