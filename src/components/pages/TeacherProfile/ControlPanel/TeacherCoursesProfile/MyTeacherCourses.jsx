import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import TeacherService from '../../../../../services/teacher.service';
import './MyTeacherCourses.scss';
import LmsButton from '../../../../reUseComponents/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';

function MyTeacherCourses() {
    const [courseData, setCourseData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await TeacherService.teacherCourses().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setCourseData(response.data.data);
                }
            });
        }
        fetchData();
    }, []);

    const handleDeleteClick = async (course_id) => {

        const response = await TeacherService.deleteTeacherCourse(course_id)
        setTotalResult(response.data.length);
    };
    const handleEditCourseClick = async (course_id) => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/course-editor/${course_id}/edit`); // Замените '/новый_маршрут' на ваш адрес назначения
    };
    
    const handleSettingsCourseClick = async (course_id) => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/course-settings/${course_id}`); // Замените '/новый_маршрут' на ваш адрес назначения
    };
    return (
        <>
            <div className="my-courses-container">
                <div className="my-courses-container__title">Мои курсы</div>

                {courseData.map((course, index) => (
                    <div key={index} className="my-courses-container__course-item">
                        <div className="course-item__course-title">
                            {course.title}
                            <p>Статус курса: {course.status}</p>
                        </div>

                        {/* {course.course_rating && (
                                    <span className="course-rating">
                                        рейтинг курса:
                                        {course.course_rating}/5{" "}
                                    </span>
                                )}
                                {!course.course_rating && (
                                    <span>
                                        Ваш курс еще не оценили{" "}
                                    </span>
                                )} */}

                        {/* <div className="course-image-container">
                                <img
                                    src={course.course_image}
                                    className="rounded float-start course-image"
                                    alt={course.title}
                                />
                            </div> */}
                        {/* <div className="course-enrolled">
                                <Link
                                    to={
                                        "/teacher-profile/enrolled-students/" +
                                        course.id
                                    }
                                    className="course-link"
                                >
                                    {course.total_enrolled_students}
                                </Link>{" "}
                            </div> */}
                        <div className="course-item__course-actions">
                            {/* <button
                                    as={Link}
                                    to={
                                        "/teacher-profile/edit-course/" +
                                        course.id
                                    }
                                    className="action-button"
                                >
                                    Редактировать данные курса
                                </button> */}

                            <LmsButton buttonText={"Редактор курса"} handleClick={() => handleEditCourseClick(course.id)} />
                            <LmsButton buttonText={"Все настройки курса"} handleClick={() => handleSettingsCourseClick(course.id)} />
                            <LmsButton buttonText={"Удалить курс"} handleClick={() => handleDeleteClick(course.id)} />
                        </div>

                    </div>
                ))}

            </div>
        </>
    );
}

export default MyTeacherCourses;