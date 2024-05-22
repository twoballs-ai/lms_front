import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../../../../services/auth.service";
import LmsButton from "../../../../reUseComponents/Button";
import TextInput from "../../../../reUseComponents/TextInput";
import "./Login.scss"
function AllProfilesLogin() {
    // const [allProfilesLoginData, setAllProfilesLoginData] = useState({
    //     username: "",
    //     password: "",
    // });
    const [errorMsg, setErrorMsg] = useState("");

    // const handleChange = (event) => {
    //     setAllProfilesLoginData({
    //         ...allProfilesLoginData,
    //         [event.target.name]: event.target.value,
    //     });
    // };
    const [inputUsernameValue, setInputUsernameValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    // const [inputDescrValue, setInputDescreValue] = useState('');
    const handleInputUsernameChange = (e) => {
        setInputUsernameValue(e.target.value);
    };
    const handleInputPasswordChange = (e) => {
        setInputPasswordValue(e.target.value);
    };
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', inputUsernameValue);
        formData.append('password', inputPasswordValue);

        await AuthService.login(formData).then((response) => {
            console.log(response)
            if (response.status === 200 || response.status === 201) {
 
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
        <div className="login-tab__auth-container">
            <div className="auth-container__log-pass-block">

                <TextInput isTextArea={false} placeholder={"Введите ваш email"} value={inputUsernameValue} onChange={handleInputUsernameChange} />
                <TextInput type={"password"} placeholder={"Введите пароль"} value={inputPasswordValue} onChange={handleInputPasswordChange} />
            </div>
            <div className="auth-container__button-confirm"><LmsButton buttonText={"Войти"} handleClick={submitForm} /></div>
        </div>
    );
}

export default AllProfilesLogin;