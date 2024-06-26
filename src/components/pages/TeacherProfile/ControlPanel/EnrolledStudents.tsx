import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";



import axios from "axios";
import { apiUrl } from "../../../../shared/config";

function EnrolledStudents() {
    const [studentData, setStudentData] = useState([]);
    let { course_id } = useParams();
    const teacherId = localStorage.getItem("teacherId");
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "enrolled-students/" + course_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setStudentData(response.data);
                console.log(response.data);
            });
    }, []);
    console.log();
    return (
        <>
            <div>
                <div>Список подписавшихся на курс</div>
                <div>
                    <Button
                        as={Link}
                        to={`/teacher-profile/view-tasks/${course_id}/`}
                        className="ms-2"
                        variant="warning"
                    >
                        Заданиe
                    </Button>
                    <Button
                        as={Link}
                        to={`/teacher-profile/add-tasks/${course_id}/`}
                        className="ms-2"
                        variant="success"
                    >
                        Заданиe
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Почта</th>
                                <th>Имя пользователя(никнейм)</th>
                                <th>Интересы</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.student.full_name}</td>
                                    <td>{student.student.email}</td>
                                    <td>{student.student.username}</td>
                                    <td>
                                        {student.student.interested_categories}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
export default EnrolledStudents;
