import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { apiUrl } from "../../../../../shared/config";
import "../registerComponents.css";

function StudentRegister() {
    const [studentRegisterData, setStudentRegisterData] = useState({
        email: "",
        password1: "",
        password2: "",
        status: "",
    });

    const handleChange = (event) => {
        setStudentRegisterData({
            ...studentRegisterData,
            [event.target.name]: event.target.value,
        });
    };
    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("email", studentRegisterData.email);
        _formData.append("password1", studentRegisterData.password1);
        _formData.append("password2", studentRegisterData.password1);
        // const teacherFormRegisterData = new FormData()
        // console.log(userData)
        // console.log(teacherRegisterData)
        try {
            axios
                .post(
                    apiUrl + "user/student-register/",
                    _formData
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                )
                .then((response) => {
                    console.log(response);
                    setStudentRegisterData({
                        email: "",
                        password1: "",
                        password2: "",
                        status: "",
                    });
                    // Handle response
                });
        } catch (error) {
            console.log(error);
            setStudentRegisterData({ status: "error" });
        }
    };
    return (
        <div className="mx-3">
            <Row className="justify-content-md-center">
                <Col md={3}>
                    {studentRegisterData.status === "success" && (
                        <p className="text-success">
                            регистрация прошла успешно
                        </p>
                    )}
                    {studentRegisterData.status === "error" && (
                        <p className="text-danger">
                            Во время регистрации произошла ошибка
                        </p>
                    )}
                    <Form>
                    <FloatingLabel
                        controlId="email"
                        label="Введите ваш email"
                        className="mb-3 text-secondary text-label-size"
                    >
                        <Form.Control
                             value={studentRegisterData.email}
                             name="email"
                             onChange={handleChange}
                             type="email"
                             placeholder="Введите ваш email"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="password"
                        label="Введите пароль"
                        className="mb-3 text-secondary text-label-size"
                    >
                        <Form.Control
                                value={studentRegisterData.password1}
                                name="password1"
                                onChange={handleChange}
                                type="password1"
                                placeholder="Введите пароль"
                        />
                    </FloatingLabel>
                        <Button
                            onClick={submitForm}
                            variant="primary"
                            type="submit"
                        >
                            Регистрация
                        </Button>
                    </Form>
                </Col>
                <Col md={4} className="auth_reg_text">
                    <span>Выберите этот вариант если вы хотите проходить курсы на нашей платформе, 
                        в последующем вы сможете расширить свою учетную запись для преподавания..</span>
                </Col>
            </Row>
        </div>
    );
}

export default StudentRegister;
