import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import Image from "react-bootstrap/Image";

// import Form from 'react-bootstrap/Form';

import { apiUserUrl } from "../../../../shared/config";

function ProfileSettings() {
    const teacherId = localStorage.getItem("user");
    const [teacherData, setTeacherData] = useState({
        full_name: "",
        email: "",
        qualification: "",
        phone: "",
        skills: "",
        status: "",
        previous_teacher_image: "",
        teacher_image: "",
    });
    useEffect(() => {
        axios
            .get(
                apiUserUrl + "teacher/" + teacherId
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setTeacherData({
                    full_name: response.data.full_name,
                    email: response.data.email,
                    qualification: response.data.qualification,
                    phone: response.data.phone,
                    skills: response.data.skills,
                    previous_teacher_image: response.data.teacher_image,
                    teacher_image: "",
                });
                console.log(response.data);
            });
    }, []);

    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
        //   console.log("teacherRegisterData : ")
        // console.log(teacherRegisterData)
    };

    const handleFileChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0],
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("full_name", teacherData.full_name);
        _formData.append("email", teacherData.email);
        _formData.append("qualification", teacherData.qualification);
        _formData.append("phone", teacherData.phone);
        _formData.append("skills", teacherData.skills);
        if (teacherData.teacher_image !== "") {
            _formData.append(
                "teacher_image",
                teacherData.teacher_image,
                teacherData.teacher_image.name
            );
        }
        console.log(teacherData);
        try {
            axios
                .put(
                    apiUserUrl + "teacher/" + teacherId + "/",
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
            setTeacherData({ status: "error" });
        }
    };
    // const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    // if (teacherLoginStatus !== "true") {
    //     window.location.href = "/teacher-login";
    // }
    return (
        <>
            <div className="border border-0 shadow ">
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
                                value={teacherData.full_name}
                                name="full_name"
                                onChange={handleChange}
                                type="text"
                                placeholder="Введите ваше ФИО"
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>
                                Добавить заглавную картинку курса
                            </Form.Label>
                            <Form.Control
                                name="teacher_image"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        {
                            teacherData.previous_teacher_image && (
                                <Image
                                    src={teacherData.previous_teacher_image}
                                    rounded
                                    width="400"
                                />
                            )
                            // <img src={courseEditData.previous_course_image} width="400" />
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                value={teacherData.email}
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
                            <Form.Label>Квалификация</Form.Label>
                            <Form.Control
                                value={teacherData.qualification}
                                name="qualification"
                                onChange={handleChange}
                                type="text"
                                placeholder="Введите вашу квалификацию"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicphone">
                            <Form.Label>Номер телефона</Form.Label>
                            <Form.Control
                                value={teacherData.phone}
                                name="phone"
                                onChange={handleChange}
                                type="text"
                                placeholder="Введите имя пользователя"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicskills"
                        >
                            <Form.Label>Навыки</Form.Label>
                            <Form.Control
                                value={teacherData.skills}
                                name="skills"
                                onChange={handleChange}
                                as="textarea"
                                placeholder="Введите имя пользователя"
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

export default ProfileSettings;
