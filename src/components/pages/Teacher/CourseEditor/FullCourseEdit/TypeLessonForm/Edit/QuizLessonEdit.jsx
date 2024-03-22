import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Figure from "react-bootstrap/Figure";
import Editor from "../../../../../../Editor";
import axios from "axios";
import { apiUrl, typesApiUrl } from "../../../../../../../shared/config";
import CourseEditorService from "../../../../../../../services/course.editor.service";
function EditQuizLesson(props) {
    let stage_id = props.contentData.stage
    let contentData = props.contentData.content
    const location = useLocation();
    const navigate = useNavigate();
    const [quizLessonData, setQuizLessonData] = useState({
        stage: stage_id,
        is_quiz: true,
        content: "",
        answer1: props.contentData.answer1,
        answer2: props.contentData.answer2,
        answer3: props.contentData.answer3,
        answer4: props.contentData.answer4,
        true_answer: props.contentData.true_answer,
    });

    const [valueEditor, setValueEditor] = useState('')
    const handleChangeContent = (valueEditor) => {
        setValueEditor(valueEditor)
    }

 
    const handleChange = (event) => {
        setQuizLessonData({
            ...quizLessonData,
            [event.target.name]: event.target.value,
        });
        // console.log(quizLessonData);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        quizLessonData.content=valueEditor
        await CourseEditorService.editCoursePagePutQuizLesson(props.contentData.id,quizLessonData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                window.location.reload();
            }
        });
    };
    return (
        <div>
            <Card className="mt-3 mx-3">
                    <Card.Header>
                    Вы находитесь на этапе редактирования квиза(теста)
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
                                <Editor onChange={handleChangeContent} data ={contentData} />
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
                                    defaultValue={props.contentData.answer1}
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
                                    defaultValue={props.contentData.answer2}
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
                                    defaultValue={props.contentData.answer3}
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
                                    defaultValue={props.contentData.answer4}
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
                                    defaultValue={props.contentData.true_answer}
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

        </div>
    );
}

export default EditQuizLesson