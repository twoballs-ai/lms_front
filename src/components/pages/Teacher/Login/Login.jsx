import React from 'react';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { teacherLoginApiUrl } from "../../../../shared/config";

function TeacherLogin() {
    const [teacherLoginData, setTeacherLoginData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value,
        });
        console.log(teacherLoginData);
    };

    const submitForm = (e) => {
        e.preventDefault();
        // const teacherFormrData = new FormData()
        // teacherFormrData.append("email", teacherLoginData.email)
        // teacherFormrData.append("password", teacherLoginData.password)
        console.log(teacherLoginData);
        axios
            .post(
                teacherLoginApiUrl,
                teacherLoginData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                if (response.data.bool === true) {
                    // console.log(response)
                    localStorage.setItem("teacherLoginStatus", true);
                    localStorage.setItem("teacherId", response.data.teacher_id);
                    window.location.href = "/teacher-profile/dashboard";
                } else {
                    setErrorMsg(response.data.message);
                }

                // Handle response
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    if (teacherLoginStatus === "true") {
        window.location.href = "/teacher-profile/dashboard";
    }
    return (
        <>
            <Container>
                <Row>
                    <Col>
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
                                            value={teacherLoginData.email}
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
                                            value={teacherLoginData.password}
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
            </Container>
        </>
    );
}

export default TeacherLogin;
