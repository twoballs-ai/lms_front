import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
// import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import { apiUserUrl } from "../../../../shared/config";
// import authHeader from '../../../../services/auth-header'
import TeacherService from '../../../../services/teacher.service'
function Dashboard() {
    const [dashboardData, setDashboardData] = useState([]);
    const teacherId = localStorage.getItem("user");

    useEffect( () => {
        const fetchData = async () => {
        await TeacherService.teacherDashboard(teacherId).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setDashboardData(response.data);
            }
        });
    }
    fetchData()
        // try {
        //     axios
        //         .get(
        //             apiUserUrl + "teacher/dashboard/" + teacherId, { headers: authHeader() }
        //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //             // ,{headers: { "Content-Type": "multipart/form-data" }}
        //         )
        //         .then((response) => {
        //             setDashboardData(response.data);
        //             console.log(response.data);
        //         });
        // } catch (e) {
        //     console.log(e);
        // }
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <Card border="primary" style={{ width: "18rem" }}>
                        <Card.Header>Всего курсов</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {dashboardData.total_teacher_courses}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-4">
                    <Card border="success" style={{ width: "18rem" }}>
                        <Card.Header>Всего студентов</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {dashboardData.total_teacher_students}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-4">
                    <Card border="info" style={{ width: "18rem" }}>
                        <Card.Header>Создано глав</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {dashboardData.total_teacher_chapters}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
