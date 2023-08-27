import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { apiUrl } from "../../../../shared/config";

function MyTeacherCourses() {
    const [courseData, setCourseData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const teacherId = localStorage.getItem("teacherId");
    // const [avgRatingStatus, setAvgRatingStatus] = useState("")
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "teacher-courses/" + teacherId
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setCourseData(response.data);
                setTotalResult(response.data.length);
                console.log(response.data.length);
                // setAvgRatingStatus
            });
    }, [totalResult]);
    const handleDeleteClick = (course_id) => {

                try {
                    axios
                        .delete(apiUrl + "teacher-courses-detail/" + course_id)
                        .then((response) => {
                           
                            setTotalResult(response.data.length);
                            console.log(response.data.length);
                        });
                 
                } catch (error) {
                   
                }
       
     
    };
    return (
        <>
            <Card>
                <Card.Header>Мои курсы</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Название курса</th>
                                <th>Обложка</th>
                                <th>Учеников на курсе</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((course, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to={
                                                "/teacher-profile/all-chapters/" +
                                                course.id
                                            }
                                        >
                                            {course.title}
                                        </Link>
                                        <hr />
                                        {course.course_rating && (
                                            <span>
                                                рейтинг курса:
                                                {course.course_rating}/5{" "}
                                            </span>
                                        )}
                                        {!course.course_rating && (
                                            <span>
                                                Ваш курс еще не оценили{" "}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <img
                                            src={course.course_image}
                                            width="80"
                                            className="rounded float-start"
                                            alt={course.title}
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            to={
                                                "/teacher-profile/enrolled-students/" +
                                                course.id
                                            }
                                        >
                                            {course.total_enrolled_students}
                                        </Link>{" "}
                                    </td>
                                    <td>
                                        <Button
                                            as={Link}
                                            to={
                                                "/teacher-profile/edit-course/" +
                                                course.id
                                            }
                                            variant="info"
                                        >
                                            Редактировать <br /> данные курса
                                        </Button>{" "}
                                        {/* <Button
                                            as={Link}
                                            to={
                                                "/teacher-profile/study-materials/" +
                                                course.id
                                            }
                                            variant="success"
                                        >
                                            Добавить учебный
                                            <br /> материал
                                        </Button>{" "} */}
                                        {/* <Button
                                            as={Link}
                                            to={
                                                "/teacher-profile/add-chapter/" +
                                                course.id
                                            }
                                            variant="primary"
                                        >
                                            добавить главу <br /> в курс
                                        </Button>{" "} */}
                                        {/* <Button
                                            as={Link}
                                            to={
                                                "/teacher-profile/assign-quiz/" +
                                                course.id
                                            }
                                            variant="warning"
                                        >
                                            привязать <br /> квиз
                                        </Button>{" "} */}
                                        <Button
                                            as={Link}
                                            to={
                                                "/edit-course-full/editor-info/" +
                                                course.id
                                            }
                                            variant="secondary"
                                        >
                                            перейти в <br /> редактор курса
                                        </Button>{" "}
                                        <Button
                                            onClick={() =>
                                                handleDeleteClick(course.id)
                                            }
                                            variant="danger"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                            />
                                            Удалить <br />
                                            курс
                                        </Button>{" "}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}
export default MyTeacherCourses;
