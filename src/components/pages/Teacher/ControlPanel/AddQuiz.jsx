import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { quizApiUrl } from "../../../../shared/config";

function AddQuiz() {
    const teacherId = localStorage.getItem("teacherId");
    //   const [categories,setCategories] = useState([])
    const [quizData, setQuizData] = useState({
        title: "",
        detail: "",
        teacher: teacherId,
    });

    const handleChange = (event) => {
        setQuizData({
            ...quizData,
            [event.target.name]: event.target.value,
        });
        console.log(quizData);
    };
    // const handleChange = (event)=>{
    //   setTeacherLoginData({
    //     ...teacherLoginData,
    //     [event.target.name]:event.target.value
    //   })
    //   console.log(teacherLoginData)
    // }

    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                quizApiUrl + "quiz/",
                quizData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                window.location.href = "/teacher-profile/add-quiz";
            });
    };
    return (
        <>
            <Card>
                <Card.Header>Добавление квиза</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Детали</Form.Label>
                            <Form.Control
                                name="detail"
                                as="textarea"
                                rows={3}
                                placeholder="Детали"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button
                            onClick={formSubmit}
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default AddQuiz;
