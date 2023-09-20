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
import ReactPlayer from 'react-player'


import { apiUrl, typesApiUrl } from "../../../../../../shared/config";
function EditVideoLesson(props) {
    let stage_id = props.contentData.stage
    let contentData = props.contentData.video_lesson

    const location = useLocation();
    const navigate = useNavigate();
    const [videoLessonData, setVideoLessonData] = useState({
        stage: stage_id,
        is_video: true,
        video_lesson: "",

 
    });

    // console.log(location.state);

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
        _formData.append("stage", stage_id);
        _formData.append("is_video", videoLessonData.is_video);
        _formData.append("video_lesson", videoLessonData.video_lesson);
        axios
            .put(
                typesApiUrl + "video-lesson-detail/" + props.contentData.id,
                _formData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                console.log(response.status)
                // navigate(-2);
                window.location.reload();
            });
    };
    return (
        <div>
        
                <Card>
                    <Card.Header>
                    Вы находитесь на этапе редактирования видеоурока
                    </Card.Header>
                    <Card.Body>
                        <Form>
                                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Ваше ранее загруженное для этого урока видео.
                                </Form.Label>
                                <ReactPlayer url={contentData} controls ="true"/>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Напишите сюда описание видеоурока
                                </Form.Label>
                                <Form.Control
                                    name="video_lesson"
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
   
        </div>
    );
}

export default EditVideoLesson