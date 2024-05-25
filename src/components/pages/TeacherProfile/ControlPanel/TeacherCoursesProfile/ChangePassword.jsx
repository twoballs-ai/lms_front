import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";




import axios from "axios";
// import Image from "react-bootstrap/Image";

// import Form from 'react-bootstrap/Form';

// import { apiUrl } from "../../../../../shared/config";

function ChangePassword() {
    const [teacherData, setTeacherData] = useState({
        password: "",
    });

    const teacherId = localStorage.getItem("user");

    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
        //   console.log("teacherRegisterData : ")
        // console.log(teacherRegisterData)
    };
    const submitForm = (e) => {
        e.preventDefault();

        try {
            axios
                .post(
                    apiUrl + "teacher/reset-password/" + teacherId + "/",
                    teacherData,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        window.location.href = "/teacher-logout";
                    } else {
                        alert("пароль не сменен");
                    }
                    // window.location.href='/teacher-profile/my-courses'
                    // Handle response
                });
        } catch (error) {
            console.log(error);
            setTeacherData({ status: "error" });
        }
    };
    return (
        <>
            <div className="border border-0 shadow ">
                <div>Смена пароля</div>
                <div>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicpassword"
                        >
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                name="password"
                                onChange={handleChange}
                                type="text"
                                placeholder="Введите ваш password"
                            />
                        </Form.Group>
                        <Button
                            onClick={submitForm}
                            variant="primary"
                            type="submit"
                        >
                            сменить пароль
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
