import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
// import { teacherApiUrl } from "../../../../../shared/config";

import "../registerComponents.css";
import { apiUrl } from "../../../../shared/config";
import AuthService from "../../../../services/auth.service";

function TeacherRegister() {
    const [showDangerAlert, setshowDangerAlert] = useState(false);

    const [textDangerAlert, setTextDangerAlert] = useState({});

    const [teacherRegisterData, setTeacherRegisterData] = useState({
        email: "",
        password1: "",
        password2: "",
        status: "",
    });

    const handleChange = (event) => {
        setTeacherRegisterData({
            ...teacherRegisterData,
            [event.target.name]: event.target.value,
        });
        //   console.log("teacherRegisterData : ")
        // console.log(teacherRegisterData)
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("email", teacherRegisterData.email);
        _formData.append("password1", teacherRegisterData.password1);
        _formData.append("password2", teacherRegisterData.password1);

        await AuthService.teacherRegister(_formData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setTeacherRegisterData({
                    email: "",
                    password1: "",
                    password2: "",
                    status: "success",
                });
                console.log(response);
            }
        });

        // const teacherFormRegisterData = new FormData()
        // console.log(userData)
        // console.log(teacherRegisterData)
        // try {
        //     const response = await  axios
        //         .post(apiUrl + "user/teacher-register/",
        //             _formData
        //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //         )
        //         console.log(response);
        //         // console.log(JSON.stringify(response?.data));
        //         // .then((response) => {
        //             if (response.status === 200 || response.status === 201) {
        //                 setTeacherRegisterData({
        //                     email: "",
        //                     password1: "",
        //                     password2: "",
        //                     status: "success",
        //                 });
        //         //         console.log(response);
        //             }

        //         //     // window.location.href = "/teacher-profile/verify-teacher/" + response.data.id;
        //         // })
        //         // .catch((err) => {
        //         //     console.log(err.response);

        //         //         setshowDangerAlert(true)
        //         //         setTextDangerAlert(err.response.data)

        //         //   })
        // } catch (error) {
        //     console.log(error);
        //     setTeacherRegisterData({ status: "error" });
        // }
    };
    // useEffect(()=>{
    //   document.title = 'Регистрация наставника'
    // })
    console.log(teacherRegisterData);
    return (
        <div className="mx-3">
            <Row className="justify-content-md-center">
                <Col md={3}>
                    {teacherRegisterData.status === "success" && (
                        <p className="text-success">
                            регистрация прошла успешно
                        </p>
                    )}
                    {teacherRegisterData.status === "error" && (
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
                                value={teacherRegisterData.email}
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
                                value={teacherRegisterData.password1}
                                name="password1"
                                onChange={handleChange}
                                type="password1"
                                placeholder="Введите пароль"
                            />
                        </FloatingLabel>
                        <Button
                            onClick={submitForm}
                            variant="secondary"
                            type="submit"
                        >
                            Регистрация
                        </Button>
                    </Form>
                </Col>
                <Col md={4} className="auth_reg_text">
                    <span>
                        Выберите этот вариант если вы хотите создавать курсы на
                        нашей платформе. В будущем вы сможете на них
                        зарабатывать.
                    </span>
                </Col>
                <Alert
                    show={showDangerAlert}
                    variant="danger"
                    // className="w-25 mt-3 ml-3 "
                    onClose={() => setshowDangerAlert(false)}
                    dismissible
                >
                    {JSON.stringify(textDangerAlert)}
                </Alert>
            </Row>
        </div>
    );
}

export default TeacherRegister;
