import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import StudentService from "../../../../../services/student.service";
import LmsButton from "../../../../reUseComponents/Button";
import { useLocation, useNavigate } from 'react-router-dom';


// import axios from "axios";
// import { apiUrl } from "../../../../../shared/config";

function StudentMyCourses() {
    const [courseData, setCourseData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await StudentService.studentCourses().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    // console.log(response.data.data)
                    setCourseData(response.data.data);
                }
            });
        }
        fetchData();
    }, []);
    const handlePassingCourseClick = async (course_id) => {
        // Перенаправляем пользователя на другую страницу
        navigate(`/course-learning/${course_id}/learning`); // Замените '/новый_маршрут' на ваш адрес назначения
    };
    return (
        <>
                       <div className="my-courses-container">
                <div className="my-courses-container__title">Мои курсы</div>
                
                    {courseData.map((course, index) => (
                        <div key={index} className="my-courses-container__course-item">
                            <div className="course-item__course-title">
                       
                                    {course.title}
                    
                                    </div>

                            <div className="course-item__course-actions">

                                <LmsButton buttonText={"Проходить курс"} handleClick={() => handlePassingCourseClick(course.id)} />

                            </div>
                        </div>
                    ))}
             
            </div>
        </>
    );
}
export default StudentMyCourses;
