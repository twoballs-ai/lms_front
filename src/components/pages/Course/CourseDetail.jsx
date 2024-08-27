import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from 'antd';
import { Tooltip } from 'antd';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from 'react-router-dom';
import { apiBaseUrl, apiUrl, serverUrl } from "../../../shared/config";
import SiteService from "../../../services/siteNoAuth.service";
import ImageViewer from "../../reUseComponents/ImageViewer";
import LmsButton from "../../reUseComponents/Button";
import StudentService from "../../../services/student.service";
import "./CourseDetail.scss"

function CourseDetail() {
    const navigate = useNavigate();

    let { course_id } = useParams();
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
    const handleCloseRate = () => setShowRate(false);
    const handleShowRate = () => setShowRate(true);
    const [favoriteStatus, setFavoriteStatus] = useState("");
    const studentId = localStorage.getItem("studentId");
    const [ratingData, setRatingData] = useState({
        rating: "1",
        review: "",
    });

    useEffect(() => {
        const fetchData = async () => {

            await SiteService.getCourse(course_id).then((response) => {

                if (response.status === 200 || response.status === 201) {

                    if (response.data.data.length !== 0) {
                        setCourseData(response.data.data);
                        console.log(response.data.data)
                        // Устанавливаем selectedStage во второй элемент массива data
                        // setSelectedStage(response.data.data[0]);
                    } else {
                        // Устанавливаем selectedStage в первый элемент массива data
                        // setSelectedStage(null);
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
                        const enrolledStatus = response.data.enrolled_status;
                        console.log(response.data);
                        setEnrollStatus(enrolledStatus);
                    }
                } catch (error) {
                    console.error("Failed to fetch enrollment status:", error);
                }
            };


            fetchAuthData();

        }

        // try {
        //     axios
        //         .get(
        //             apiUrl + "course/" + course_id
        //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //             // ,{headers: { "Content-Type": "multipart/form-data" }}
        //         )
        //         .then((response) => {
        //             setCourseData(response.data);
        //             setTeacherData(response.data.teacher);
        //             setChapterData(response.data.course_chapters);
        //             setRelatedCourseData(
        //                 JSON.parse(response.data.related_courses)
        //             );
        //             setTechnologicalListData(response.data.technological_list);
        //             if (
        //                 response.data.course_rating !== "" &&
        //                 response.data.course_rating !== null
        //             ) {
        //                 setAvgRatingStatus(response.data.course_rating);
        //             }

        //             try {
        //                 axios
        //                     .get(
        //                         apiUrl + "chapter/" + response.data.course_chapters[0]["id"]
        //                         // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //                         // ,{headers: { "Content-Type": "multipart/form-data" }}
        //                     )
        //                     .then((response) => {
        //                         setFirstModuleData(response.data.chapter_modules)
        //                         console.log(response.data.chapter_modules);
        //                     });
        //             } catch (error) {
        //                 console.log(error);
        //             }
        //         });
        // } catch (error) {
        //     console.log(error);
        // }

        // axios.get(apiUrl + "update-view/" + course_id).then((res) => {
        //     setCourseViews(res.data.views);
        // });
        // //  узнаем подписан ли ученик
        // try {
        //     axios
        //         .get(
        //             apiUrl +
        //             "enroll-course-status/" +
        //             studentId +
        //             "/" +
        //             course_id
        //         )
        //         .then((response) => {
        //             if (response.data.bool == true) {
        //                 setEnrollStatus("success");
        //             }
        //         });
        // } catch (error) {
        //     console.log(error);
        // }
        // try {
        //     axios
        //         .get(
        //             apiUrl + "get-rating-status/" + studentId + "/" + course_id
        //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //             // ,{headers: { "Content-Type": "multipart/form-data" }}
        //         )
        //         .then((response) => {
        //             if (response.data.bool == true) {
        //                 setRatingStatus("success");
        //                 console.log(response.data);
        //             }

        //             console.log(response.data);
        //         });
        // } catch (error) {
        //     console.log(error);
        // }
        // try {
        //     axios
        //         .get(
        //             apiUrl +
        //             "get-favorite-status/" +
        //             studentId +
        //             "/" +
        //             course_id
        //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //             // ,{headers: { "Content-Type": "multipart/form-data" }}
        //         )
        //         .then((response) => {
        //             if (response.data.bool == true) {
        //                 setFavoriteStatus("success");
        //             } else {
        //                 setFavoriteStatus("");
        //             }

        //             console.log(response.data);
        //         });
        // } catch (error) {
        //     console.log(error);
        // }

    }, [course_id, enrollStatus]);

    useEffect(() => {
        if (courseData && courseData.title) {
            document.title = (`${courseData.title} - courserio.ru`);
        }
    }, [courseData]);


    const enrollCourse = async () => {
        await StudentService.enrollToCourse(course_id).then((response) => {
            if (response.status === 200 || response.status === 201) {
                // setCourseData(response.data.data);
                if (response.data.data.length !== 0) {
                    setEnrollStatus(response.data.enrolled_status)
                } else {
                    setEnrollStatus("not enrolled")
                }
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
    const handlePassingCourseClick = async (course_id) => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/course-learning/${course_id}/learning`); // Замените '/новый_маршрут' на ваш адрес назначения
    };
    // функция рейтинг
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
                    apiUrl + "course-rating/" + course_id,
                    {
                        rating: ratingData.rating,
                        review: ratingData.review,
                        student: studentId,
                        course: course_id,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        window.location.reload();
                    }
                });
        } catch (error) {

        }
    };
    const addToFavorite = () => {
        try {
            axios
                .post(
                    apiUrl + "add-favorite-courses/",
                    {
                        student: studentId,
                        course: course_id,
                        is_favorite: true,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        setFavoriteStatus("success");
                    }
                });
        } catch (error) {
        }
    };
    console.log(relatedCourseData)
    const removeFromFavorite = () => {
        try {
            axios
                .get(
                    apiUrl +
                    "remove-favorite-courses/" +
                    studentId +
                    "/" +
                    course_id,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        // setShow(false)
                        // setEnrollStatus('success')
                        setFavoriteStatus("");
                    }
                });
        } catch (error) {

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
                        <Link to={courseData.teacher ? `/teacher-detail/${courseData.teacher.id}` : '#'}>
                            {courseData.teacher ? `${courseData.teacher.name} ${courseData.teacher.lastname}` : 'Loading...'}
                        </Link>
                    </p>
                    {/* <p>Длительность курса:</p> */}
                    <p>Всего подписавшихся пользователей:{courseData.course_subscription}</p>
                    <div className="info-wrap__enrol-buttons">
                        {userLoggedStatus === "success" && (
                            <>
                                {enrollStatus === "enrolled" ? (
                                    <>
                                        <p>
                                          
                                            <LmsButton
                                                buttonText="Проходить курс"
                                                handleClick={handlePassingCourseClick}
                                            />
                                              <span> Вы подписаны на курс и можете проходить курс</span>
                                        </p>
                                        <p>

             
                                        <LmsButton
                                            buttonText="Отписаться от курса"
                                            handleClick={unsubscribeFromCourse}
                                        />
                                            <span> Вы не потеряете ваш прогресс просто перестанете получать оповещения по курсу</span>
                                        </p>

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
                {/* {relatedCourseData.map((related, index) => (
                    <div>
                        <div style={{ width: "10rem" }}>
                            <Link
                                target="_blank"
                                to={`/detail/${related.pk}`}
                            >
                                <div.Img
                                    variant="top"
                                    src={`${serverUrl}media/${related.fields.course_image}`}
                                />
                            </Link>
                            <div>
                                <div>
                                    <Link
                                        target="_blank"
                                        to={`/detail/${related.pk}`}
                                    >
                                        {related.fields.title}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>

    );
}
export default CourseDetail;
