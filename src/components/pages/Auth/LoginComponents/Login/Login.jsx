import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
// import { restAuthApiUrl } from "../../../../shared/config";
import AuthService from "../../../../../services/auth.service";

function AllProfilesLogin() {
    const [allProfilesLoginData, setAllProfilesLoginData] = useState({
        email: "",
        password: "",
        success: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const handleChange = (event) => {
        setAllProfilesLoginData({
            ...allProfilesLoginData,
            [event.target.name]: event.target.value,
        });
        console.log(allProfilesLoginData);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        // const teacherFormrData = new FormData()
        // teacherFormrData.append("email", teacherLoginData.email)
        // teacherFormrData.append("password", teacherLoginData.password)
        // console.log(allProfilesLoginData);
        await AuthService.login(allProfilesLoginData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                setAllProfilesLoginData({
                    email: "",
                    password: "",
                    success: "true",
                });
                localStorage.clear();
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(response?.data?.access)
                );
                localStorage.setItem(
                    "refresh_token",
                    JSON.stringify(response?.data?.refresh)
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(response?.data?.user?.id)
                );
            }
            if (response?.data?.user?.is_teacher === true) {
                localStorage.setItem(
                    "is_teacher",
                    response?.data?.user?.is_teacher
                );
                window.location.href = "/teacher-profile/dashboard";
            }
            if (response?.data?.user?.is_student === true) {
                localStorage.setItem(
                    "is_student",
                    response?.data?.user?.is_student
                );
                window.location.href = "/student-profile/dashboard";
            }
        });
        // axios
        //     .post(
        //         restAuthApiUrl + "login/",
        //         allProfilesLoginData,
        //         // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        //         { headers: { "Content-Type": "multipart/form-data" } }
        //     )
        //     .then((response) => {
        //         if (response.status === 200 || response.status === 201) {
        //             console.log(response)
        //             localStorage.clear();
        //             localStorage.setItem('access_token', response?.data?.access);
        //             localStorage.setItem('refresh_token', response?.data?.refresh);
        //             localStorage.setItem("user", response?.data?.user?.id);
        //             if (response?.data?.user?.is_teacher===true){
        //                 localStorage.setItem("is_teacher", response?.data?.user?.is_teacher);
        //                 window.location.href = "/teacher-profile/dashboard";
        //             }
        //             if (response?.data?.user?.is_user===true){
        //                 localStorage.setItem("is_user", response?.data?.user?.is_user);
        //                 window.location.href = "/student-profile/dashboard";
        //             }

        //             // window.location.href = "/teacher-profile/dashboard";
        //         } else {
        //             setErrorMsg(response.data.message);
        //         }

        //         // Handle response
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    // const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    // if (teacherLoginStatus === "true") {
    //     window.location.href = "/teacher-profile/dashboard";
    // }
    return (
        <div className="mx-3">
            <div className="justify-content-md-center">
                <div md={4}>
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    <div>
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить меня" />
      </Form.Group> */}
                        <div
                            controlId="email"
                            label="Введите ваш email"
                            className="mb-3 text-secondary text-label-size"
                        >
                            <div
                                value={allProfilesLoginData.email}
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
                                value={allProfilesLoginData.password}
                                name="password"
                                onChange={handleChange}
                                type="password"
                                placeholder="Введите пароль"
                            />
                        </div>
                        <button
                            onClick={submitForm}
                            variant="secondary"
                            type="submit"
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllProfilesLogin;
