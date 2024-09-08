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
        fetchData();
    }, []);
    useEffect(() => {
        document.title = 'Профиль учителя - мои курсы - coursero.ru';
      }, []);
    const fetchData = async () => {
        await TeacherService.teacherCourses().then((response) => {
            if (response.status === 200 || response.status === 201) {
                setCourseData(response.data.data);
            }
        });
    }

    const handleArchiveClick = async (course_id) => {
        const response = await TeacherService.archiveTeacherCourse(course_id)
        if (response.status === 200 || response.status === 201) {
            // Если удаление прошло успешно, обновляем список курсов
            fetchData();
        }
    };

    const handleEditCourseClick = async (course_id) => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/course-editor/${course_id}/edit`);
    };
    
    const handleSettingsCourseClick = async (course_id) => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/course-settings/${course_id}`);
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
                           {course.moderation_status !==null ? <p>Статус модерации: {course.moderation_status}</p>: ""} 
                        </div>

                        <div className="course-item__course-actions">
                            <LmsButton buttonText={"Редактор курса"} handleClick={() => handleEditCourseClick(course.id)} />
                            <LmsButton buttonText={"Все настройки курса"} handleClick={() => handleSettingsCourseClick(course.id)} />
                            <LmsButton buttonText={"Архивировать курс"} handleClick={() => handleArchiveClick(course.id)} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MyTeacherCourses;
