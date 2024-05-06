import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import Image from "react-bootstrap/Image";

// import Form from 'react-bootstrap/Form';

import { apiUrl } from "../../../../shared/config";

function StudentProfileSettings() {
    const studentId = localStorage.getItem("studentId");
    const [studentData, setStudentData] = useState({
        full_name: "",
        email: "",
        username: "",
        interested_categories: "",
        status: "",
        previous_student_image: "",
        student_image: "",
    });
    useEffect(() => {
        axios
            .get(
                apiUrl + "student/" + studentId
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setStudentData({
                    full_name: response.data.full_name,
                    email: response.data.email,
                    username: response.data.username,
                    interested_categories: response.data.interested_categories,
                    previous_student_image: response.data.student_image,
                    student_image: "",
                });
                console.log(response.data);
            });
    }, []);

    const handleChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value,
        });
        //   console.log("teacherRegisterData : ")
        // console.log(teacherRegisterData)
    };

    const handleFileChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.files[0],
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("full_name", studentData.full_name);
        _formData.append("email", studentData.email);
        _formData.append(
            "interested_categories",
            studentData.interested_categories
        );
        _formData.append("username", studentData.username);
        if (studentData.student_image !== "") {
            _formData.append(
                "student_image",
                studentData.student_image,
                studentData.student_image.name
            );
        }
        console.log(studentData);
        try {
            axios
                .put(
                    apiUrl + "student/" + studentId + "/",
                    _formData,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {

                    }
                    // window.location.href='/teacher-profile/my-courses'
                    // Handle response
                });
        } catch (error) {
            console.log(error);
            setStudentData({ status: "error" });
        }
    };
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus !== "true") {
        window.location.href = "/student-login";
    }
    return (
        <>
            <div>
                <div>
                    <h3>Изменение настроек профиля</h3>
                </div>
                <div>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicfull_name"
                        >
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                value={studentData.full_name}
                                name="full_name"
                                onChange={handleChange}
                                type="text"
                                placeholder="Введите ваше ФИО"
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>
                                Добавить картинку портфолио.
                            </Form.Label>
                            <Form.Control
                                name="student_image"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        {
                            studentData.previous_student_image && (
                                <Image
                                    src={studentData.previous_student_image}
                                    rounded
                                    width="400"
                                />
                            )
                            // <img src={courseEditData.previous_course_image} width="400" />
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                value={studentData.email}
                                name="email"
                                onChange={handleChange}
                                type="email"
                                placeholder="Введите ваш email"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicqualification"
                        >
                            <Form.Label>username</Form.Label>
                            <Form.Control
                                value={studentData.username}
                                name="username"
                                onChange={handleChange}
                                type="text"
                                placeholder="Введите вашу username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicphone">
                            <Form.Label>interested_categories</Form.Label>
                            <Form.Control
                                value={studentData.interested_categories}
                                name="interested_categories"
                                onChange={handleChange}
                                type="text"
                                placeholder="Введите имя interested_categories"
                            />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check name="checkbox" onChange={handleChange} type="checkbox" label="Запомнить меня" />
                  </Form.Group> */}
                        <Button
                            onClick={submitForm}
                            variant="primary"
                            type="submit"
                        >
                            Обновить профиль
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default StudentProfileSettings;
