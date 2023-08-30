import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Figure from "react-bootstrap/Figure";
import axios from "axios";
import { apiUrl, typesApiUrl } from "../../../../../shared/config";
function AddingQuizLesson(props) {
    let stage_id = props.stage_id
    const location = useLocation();
    const navigate = useNavigate();
    const [quizLessonData, setQuizLessonData] = useState({
        stage: stage_id,
        is_quiz: true,
        questions: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        true_answer: "",
    });

    console.log(location.state);
 
    const handleChange = (event) => {
        setQuizLessonData({
            ...quizLessonData,
            [event.target.name]: event.target.value,
        });
        console.log(quizLessonData);
    };

    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                typesApiUrl + "quiz-lesson/" + stage_id,
                quizLessonData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                navigate(-2);
            });
    };
    return (
        <div>
            {location.state.type === "quizLesson" && (
                <Card>
                    <Card.Header>
                        Добавление квиза
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда ваш вопрос
                                </Form.Label>
                                <Form.Control
                                    name="questions"
                                    type="text"
                                    placeholder="Ваш вопрос"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда вариант
                                </Form.Label>
                                <Form.Control
                                    name="answer1"
                                    type="text"
                                    placeholder="вариант1"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда вариант
                                </Form.Label>
                                <Form.Control
                                    name="answer2"
                                    type="text"
                                    placeholder="вариант2"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда вариант
                                </Form.Label>
                                <Form.Control
                                    name="answer3"
                                    type="text"
                                    placeholder="вариант3"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда вариант
                                </Form.Label>
                                <Form.Control
                                    name="answer4"
                                    type="text"
                                    placeholder="вариант4"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда правильный ответ
                                </Form.Label>
                                <Form.Control
                                    name="true_answer"
                                    type="text"
                                    placeholder="правильный ответ"
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
            )}
        </div>
    );
}

export default AddingQuizLesson