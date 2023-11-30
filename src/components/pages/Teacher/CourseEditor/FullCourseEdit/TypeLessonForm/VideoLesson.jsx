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
import { apiUrl, typesApiUrl } from "../../../../../../shared/config";
function AddingVideoLesson(props) {
    let stagePk = props.data

    const location = useLocation();
    const navigate = useNavigate();
    const [videoLessonData, setVideoLessonData] = useState({
        is_video: true,
        video_lesson: "",
        stage: "",
    });

    const handleChange = (event) => {
        setVideoLessonData({
            ...videoLessonData,
            [event.target.name]: event.target.value,
        });
        console.log(videoLessonData);
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("stage", stagePk);
        _formData.append("is_video", videoLessonData.is_video);
        _formData.append("video_lesson", videoLessonData.video_lesson);
        axios
            .post(
                typesApiUrl + "video-lesson/" + stagePk,
                _formData,
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
            <Card className="mt-3 mx-3">
                    <Card.Header>
                    Вы находитесь на этапе добавления видеоурока
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
                            <Button
                                onClick={formSubmit}
                                variant="primary"
                                type="submit"
                            >
                                Добавить видеоурок
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

export default AddingVideoLesson