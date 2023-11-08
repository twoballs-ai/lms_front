import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { apiUrl } from "../../../../shared/config";

function StudentLogin() {
    const [studentLoginData, setStudentLoginData] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const handleChange = (event) => {
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]: event.target.value,
        });
        console.log(studentLoginData);
    };

    const submitForm = (e) => {
        e.preventDefault();
        // const teacherFormrData = new FormData()
        // teacherFormrData.append("email", teacherLoginData.email)
        // teacherFormrData.append("password", teacherLoginData.password)
        console.log(studentLoginData);
        axios
            .post(
                apiUrl + "student-login",
                studentLoginData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                if (response.data.bool === true) {
                    // console.log(response)
                    localStorage.setItem("studentLoginStatus", true);
                    localStorage.setItem("studentId", response.data.student_id);
                    window.location.href = "/student-profile/dashboard";
                } else {
                    setErrorMsg("Пользователя с такими данными не существует");
                }
                // Handle response
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
        window.location.href = "/student-profile/dashboard";
    }
    return (
        <div className="mx-3">
            <div className="shadow rounded p-3 mt-3 mb-5">
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Card>
                            <Card.Header>
                                <h3>Авторизация</h3>
                            </Card.Header>
                            <Card.Body>
                                {errorMsg && (
                                    <p className="text-danger">{errorMsg}</p>
                                )}
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>email</Form.Label>
                                        <Form.Control
                                            value={studentLoginData.email}
                                            name="email"
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Введите ваш email"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <Form.Label>password</Form.Label>
                                        <Form.Control
                                            value={studentLoginData.password}
                                            name="password"
                                            onChange={handleChange}
                                            type="password"
                                            placeholder="Введите пароль"
                                        />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить меня" />
      </Form.Group> */}
                                    <Button
                                        onClick={submitForm}
                                        variant="primary"
                                        type="submit"
                                    >
                                        Войти
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default StudentLogin;
