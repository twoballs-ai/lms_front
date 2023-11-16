import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiLmsUrl } from "../../../../shared/config";

function MyStudents() {
    const [studentData, setStudentData] = useState([]);
    const teacherId = localStorage.getItem("user");
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiLmsUrl + "teacher-students/" + teacherId
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
            <Card>
                <Card.Header>Список подписавшихся на курс</Card.Header>
                <Card.Body>
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
                </Card.Body>
            </Card>
        </>
    );
}
export default MyStudents;
