import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiLmsUrl } from "../../../../shared/config";
import TeacherService from '../../../../services/teacher.service';

function MyStudents() {
    const [studentData, setStudentData] = useState([]);
    const teacherId = localStorage.getItem("user");
    // console.log(teacherId)
    useEffect(() => {
        const fetchData = async () => {
            await TeacherService.teacherStudents(teacherId).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setStudentData(response.data);
                    console.log(response.data);
                }
            });
        }
        fetchData()
    }, []);

    return (
        <>
            <Card className="border border-0 shadow ">
                <Card.Header>Список всех учеников.</Card.Header>
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
