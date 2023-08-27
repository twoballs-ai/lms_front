import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { apiUrl, typesApiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from 'react-router-dom';
function AddStageLesson() {
    let { module_id } = useParams();
    let { course_id } = useParams();
    let { stage_id } = useParams();
    const [stageData, setStageData] = useState([]);
    const navigate = useNavigate();
    const addClassicLesson = () => {
        console.log('hi')  
        navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'classicLesson' } });
    };
    const addQuizLesson = () => {
        console.log('hi')  
        navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'quizLesson' } });
    };
    const addVideoLesson = () => {
        console.log('hi')  
        navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'videoLesson' } });
    };
    const addProgrammingLesson = () => {
        console.log('hi')  
        navigate(`/edit-course-full/edit-module/${course_id}/${module_id}/stage/${stage_id}`, { state: { type: 'codingLesson' } });
    };
    console.log(stageData);
    return (
        <>
            <p>Добавление нового этапа</p>
            {/* <h3></h3> */}
            <Row>
                <Col>
                    <Card border="info" style={{ width: "18rem" }}  >
                        <Card.Body>
                            <Card.Title>Классический урок</Card.Title>
                            <Card.Text
                            >
                                Классический урок позволяет добавлять текст,
                                картинки, ссылки, текст может быть сложно
                                форматируемым.
                            </Card.Text>
                            <Button
                            onClick={addClassicLesson}
                            variant="primary"
                        >
                            Выбрать
                        </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info" style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>Видео урок</Card.Title>
                            <Card.Text>
                                В видео уроке вам доступны название урока,
                                описание и ссылка на ваш видеоурок
                            </Card.Text>
                            <Button
                            onClick={addVideoLesson}
                            variant="primary"
                        >
                            Выбрать
                        </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info" style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>Квиз</Card.Title>
                            <Card.Text>
                                Квиз позволит выбрать один ответ или несколько в
                                зависимости от выбранного вами типа квиза.
                            </Card.Text>
                            <Button
                            onClick={addQuizLesson}
                            variant="primary"
                        >
                            Выбрать
                        </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card border="info" style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>
                                Написание программы или ее части
                            </Card.Title>
                            <Card.Text>
                                Практический урок который позволит отточить ваши
                                навыки программирования.
                            </Card.Text>
                            <Button
                           onClick={addProgrammingLesson}
                            variant="primary"
                        >
                            Выбрать
                        </Button>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
export default AddStageLesson;
