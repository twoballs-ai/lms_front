import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../../../../services/auth.service";
import LmsButton from "../../../../reUseComponents/Button";

function AllProfilesLogin() {
    const [allProfilesLoginData, setAllProfilesLoginData] = useState({
        username: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (event) => {
        setAllProfilesLoginData({
            ...allProfilesLoginData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', allProfilesLoginData.username);
        formData.append('password', allProfilesLoginData.password);

        await AuthService.login(formData).then((response) => {
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                setAllProfilesLoginData({
                    email: "",
                    password: "",
                });
                localStorage.clear();
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(response?.data?.access_token)
                );
                localStorage.setItem(
                    "refresh_token",
                    JSON.stringify(response?.data?.refresh_token)
                );
                if (response?.data?.type === "teacher_model") {
                    localStorage.setItem(
                        "is_teacher",
                        response?.data?.type
                    );
                    window.location.href = "/teacher-profile/";
                }
                if (response?.data?.type === "student_model") {
                    localStorage.setItem(
                        "is_student",
                        response?.data?.type
                    );
                    window.location.href = "/student-profile/";
                }
            }
        }).catch((error) => {
            setErrorMsg(error.response.data.message);
        });
    };

    return (
        <div className="mx-3">
            <div className="justify-content-md-center">
                <div md={4}>
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    <div>
                        <input
                            value={allProfilesLoginData.username}
                            name="username"
                            onChange={handleChange}
                            type="username"
                            placeholder="Введите ваш email"
                            className="form-control mb-3"
                        />
                        <input
                            value={allProfilesLoginData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Введите пароль"
                            className="form-control mb-3"
                        />
                        <LmsButton buttonText={"Войти"} handleClick={submitForm} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllProfilesLogin;