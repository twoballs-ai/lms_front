import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { apiUrl } from "../../../../shared/config";

function VerifyOTPTeacher() {
    const [teacherData, setTeacherData] = useState({
        otp_digit: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
        console.log(teacherData);
    };

    const submitForm = (e) => {
        e.preventDefault();
        // const teacherFormrData = new FormData()
        // teacherFormrData.append("email", teacherLoginData.email)
        // teacherFormrData.append("password", teacherLoginData.password)
        console.log(teacherData);
        axios
            .post(
                apiUrl + "/verify-teacher",
                teacherData,
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
                                <h3>Ввод 6 значного пин кода</h3>
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
                                        <Form.Label>OTP</Form.Label>
                                        <Form.Control
                                            value={teacherData.otp_digit}
                                            name="otp_digit"
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="Введите ваш otp"
                                        />
                                    </Form.Group>
                                    <Button
                                        onClick={submitForm}
                                        variant="primary"
                                        type="submit"
                                    >
                                        Верификация
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

export default VerifyOTPTeacher;
