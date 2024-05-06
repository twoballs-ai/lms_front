import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";



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
            <div className="border border-0 shadow ">
                <div>Список всех учеников.</div>
                <div>
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
export default MyStudents;
