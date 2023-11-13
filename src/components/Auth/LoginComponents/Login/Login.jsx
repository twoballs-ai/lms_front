import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { restAuthApiUrl } from "../../../../shared/config";


function AllProfilesLogin() {
    const [allProfilesLoginData, setAllProfilesLoginData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const handleChange = (event) => {
        setAllProfilesLoginData({
            ...allProfilesLoginData,
            [event.target.name]: event.target.value,
        });
        console.log(allProfilesLoginData);
    };

    const submitForm = (e) => {
        e.preventDefault();
        // const teacherFormrData = new FormData()
        // teacherFormrData.append("email", teacherLoginData.email)
        // teacherFormrData.append("password", teacherLoginData.password)
        console.log(allProfilesLoginData);
        axios
            .post(
                restAuthApiUrl + "login/",
                allProfilesLoginData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    console.log(response)
                    localStorage.clear();
                    localStorage.setItem('access_token', response?.data?.access);
                    localStorage.setItem('refresh_token', response?.data?.refresh);
                    localStorage.setItem("user", response?.data?.user?.id);
                    if (response?.data?.user?.is_teacher===true){
                        localStorage.setItem("is_teacher", response?.data?.user?.is_teacher);
                        window.location.href = "/teacher-profile/dashboard";
                    }
                    if (response?.data?.user?.is_user===true){
                        localStorage.setItem("is_user", response?.data?.user?.is_user);
                        window.location.href = "/student-profile/dashboard";
                    }
                    
                    // window.location.href = "/teacher-profile/dashboard";
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
        <div className="mx-3">

                <Row className="justify-content-md-center">
                    <Col md={4}>

                                {errorMsg && (
                                    <p className="text-danger">{errorMsg}</p>
                                )}
                                <Form>
                                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить меня" />
      </Form.Group> */}
                          <FloatingLabel
                        controlId="email"
                        label="Введите ваш email"
                        className="mb-3 text-secondary text-label-size"
                    >
                        <Form.Control
                             value={allProfilesLoginData.email}
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
                                value={allProfilesLoginData.password}
                                name="password"
                                onChange={handleChange}
                                type="password"
                                placeholder="Введите пароль"
                        />
                    </FloatingLabel>
                                    <Button
                                        onClick={submitForm}
                                        variant="secondary"
                                        type="submit"
                                    >
                                        Войти
                                    </Button>
                                </Form>
                    </Col>
                </Row>

        </div>
    );
}

export default AllProfilesLogin;
