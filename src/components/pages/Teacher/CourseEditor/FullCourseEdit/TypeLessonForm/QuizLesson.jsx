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
import Editor from "../../../../../Editor";
import { apiUrl, typesApiUrl } from "../../../../../../shared/config";
import CourseEditorService from "../../../../../../services/course.editor.service";
function AddingQuizLesson(props) {
    let stagePk = props.data
    const location = useLocation();
    const navigate = useNavigate();
    const [quizLessonData, setQuizLessonData] = useState({
        stage: "",
        is_quiz: true,
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        true_answer: "",
    });

    const [valueEditor, setValueEditor] = useState('')
    const handleChangeContent = (valueEditor) => {
        setValueEditor(valueEditor)
        console.log(valueEditor)
    }
 
    const handleChange = (event) => {
        setQuizLessonData({
            ...quizLessonData,
            [event.target.name]: event.target.value,
        });
        console.log(quizLessonData);
    };


    const formSubmit = async (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("stage", stagePk);
        _formData.append("content", valueEditor);
        _formData.append("is_quiz", quizLessonData.is_quiz);
        _formData.append("answer1", quizLessonData.answer1);
        _formData.append("answer2", quizLessonData.answer2);
        _formData.append("answer3", quizLessonData.answer3);
        _formData.append("answer4", quizLessonData.answer4);
        _formData.append("true_answer", quizLessonData.true_answer);
        await CourseEditorService.editCoursePageAddQuizLesson(stagePk,_formData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                navigate(-2);
            }
        });
    };


    
    return (
        <div>
            {location.state.type === "quizLesson" && (
            <Card className="mt-3 mx-3">
                    <Card.Header>
                    Вы находитесь на этапе добавления квиза(теста)
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
                                <Editor onChange={handleChangeContent} />
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