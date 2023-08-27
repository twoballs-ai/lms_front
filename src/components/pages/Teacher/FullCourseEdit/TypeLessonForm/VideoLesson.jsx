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
function AddingVideoLesson(props) {
    let stage_id = props.stage_id
    const location = useLocation();
    const navigate = useNavigate();
    const [videoLessonData, setVideoLessonData] = useState({
        stage: stage_id,
        is_video: true,
        video_lesson: "",
        description: ""
 
    });

    console.log(location.state);
 
    const handleChange = (event) => {
        setVideoLessonData({
            ...videoLessonData,
            [event.target.name]: event.target.value,
        });
        console.log(videoLessonData);
    };

    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                typesApiUrl + "video-lesson/" + stage_id,
                videoLessonData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                console.log(response.status)
                navigate(-2);
            });
    };
    return (
        <div>
            {location.state.type === "videoLesson" && (
                <Card>
                    <Card.Header>
                        Добавление видео урока
                    </Card.Header>
                    <Card.Body>
                        <Form>
                                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Добавление ссылки на видео
                                </Form.Label>
                                <Form.Control
                                    name="video_lesson"
                                    type="text"
                                    placeholder="Добавление ссылки"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда описание видеоурока
                                </Form.Label>
                                <Form.Control
                                    name="description"
                                    type="text"
                                    placeholder="описание видеоурока"
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

export default AddingVideoLesson