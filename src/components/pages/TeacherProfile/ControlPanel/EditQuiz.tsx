import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import Image from "react-bootstrap/Image";
import { quizApiUrl } from "../../../../shared/config";

function EditQuiz() {
    const teacherId = localStorage.getItem("teacherId");
    const { quiz_id } = useParams();
    const [quizEditData, setQuizEditData] = useState({
        title: "",
        detail: "",
    });

    useEffect(() => {
        axios
            .get(
                quizApiUrl + "teacher-quiz-detail/" + quiz_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setQuizEditData({
                    title: response.data.title,
                    detail: response.data.detail,
                });
                console.log(response.data);
            });
    }, []);

    const handleChange = (event) => {
        setQuizEditData({
            ...quizEditData,
            [event.target.name]: event.target.value,
        });
        console.log(quizEditData);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("teacher", teacherId);
        _formData.append("title", quizEditData.title);
        _formData.append("detail", quizEditData.detail);

        console.log(quizEditData);

        axios
            .put(
                quizApiUrl + "teacher-quiz-detail/" + quiz_id,
                _formData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                if (response.status === 200) {

                }
                window.location.href = "/teacher-profile/teacher-quizes";
            });
    };
    return (
        <>
            <div>
                <div>Редактирование данных квиза</div>
                <div>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                name="title"
                                value={quizEditData.title}
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
                                value={quizEditData.detail}
                                as="textarea"
                                rows={3}
                                placeholder="Описание"
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
                </div>
            </div>
        </>
    );
}
export default EditQuiz;
