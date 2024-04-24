import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import axios from "axios";

// import "../registerComponents.css";
// import { apiUrl } from "../../../../shared/config";
import AuthService from "../../../../../services/auth.service"

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
    const submitForm = async (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("email", studentRegisterData.email);
        _formData.append("password1", studentRegisterData.password1);
        _formData.append("password2", studentRegisterData.password1);
        // const teacherFormRegisterData = new FormData()
        // console.log(userData)
        // console.log(teacherRegisterData)

        await AuthService.studentRegister(_formData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setStudentRegisterData({
                    email: "",
                    password1: "",
                    password2: "",
                    status: "success",
                });
                console.log(response);
            }
        });
    };
    return (
        <div className="mx-3">
            <div className="justify-content-md-center">
                <div md={3}>

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
                    <div>
                        <div
                            controlId="email"
                            label="Введите ваш email"
                            className="mb-3 text-secondary text-label-size"
                        >
                            <div
                                value={studentRegisterData.email}
                                name="email"
                                onChange={handleChange}
                                type="email"
                                placeholder="Введите ваш email"
                            />
                        </div>
                        <div
                            controlId="password"
                            label="Введите пароль"
                            className="mb-3 text-secondary text-label-size"
                        >
                            <div
                                value={studentRegisterData.password1}
                                name="password1"
                                onChange={handleChange}
                                type="password1"
                                placeholder="Введите пароль"
                            />
                        </div>
                        <button
                            onClick={submitForm}
                            variant="secondary"
                            type="submit"
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
                <div md={4} className="auth_reg_text">
                    <span>Выберите этот вариант если вы хотите проходить курсы на нашей платформе,
                        в последующем вы сможете расширить свою учетную запись для преподавания..</span>
                </div>
            </div>
        </div>
    );
}

export default StudentRegister;
