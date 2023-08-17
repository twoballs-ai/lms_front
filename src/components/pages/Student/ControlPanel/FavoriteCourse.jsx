import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../shared/config";

function FavoriteCourses() {
    const [courseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem("studentId");
    useEffect(() => {
        axios
            .get(
                apiUrl + "get-favorite-courses/" + studentId
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setCourseData(response.data);
                console.log(response.data);
            });
    }, []);
    return (
        <>
            <Card>
                <Card.Header>Избранные курсы</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Название курса</th>
                                <th>Создатель</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((courses, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to={`/detail/${courses.course.id}`}
                                        >
                                            {courses.course.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/teacher-detail/${courses.course.teacher.id}`}
                                        >
                                            {courses.course.teacher.full_name}
                                        </Link>{" "}
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

export default FavoriteCourses;
