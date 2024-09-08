import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import { apiUrl } from "../../../../shared/config";

function AddQuizQuestion() {
    // const teacherId= localStorage.getItem('teacherId')
    const { quiz_id } = useParams();
    const [questionAddData, setQuestionAddData] = useState({
        quiz: quiz_id,
        questions: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        true_answer: "",
    });

    const handleChange = (event) => {
        setQuestionAddData({
            ...questionAddData,
            [event.target.name]: event.target.value,
        });
        console.log(questionAddData);
    };

    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                apiUrl + "quiz-questions/" + quiz_id,
                questionAddData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                if (response.status === 200 || response.status === 201) {

                    window.location.reload();
                }

                // window.location.href='/teacher-profile/my-courses'
            });
    };
    return (
        <>
            <div>
                <div>Добавление вопросов для квиза</div>
                <div>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Вопрос</Form.Label>
                            <Form.Control
                                name="questions"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Ответ 1</Form.Label>
                            <Form.Control
                                name="answer1"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Ответ 2</Form.Label>
                            <Form.Control
                                name="answer2"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Ответ 3</Form.Label>
                            <Form.Control
                                name="answer3"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Ответ 4</Form.Label>
                            <Form.Control
                                name="answer4"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Правильный ответ</Form.Label>
                            <Form.Control
                                name="true_answer"
                                type="text"
                                placeholder="категория"
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
export default AddQuizQuestion;
