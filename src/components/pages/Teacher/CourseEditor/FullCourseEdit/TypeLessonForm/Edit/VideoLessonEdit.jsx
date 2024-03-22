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


import { apiUrl, typesApiUrl } from "../../../../../../../shared/config";
import CourseEditorService from "../../../../../../../services/course.editor.service";
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

    const formSubmit = async (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("stage", stage_id);
        _formData.append("is_video", videoLessonData.is_video);
        _formData.append("video_lesson", videoLessonData.video_lesson);

        await CourseEditorService.editCoursePagePutVideoLesson(props.contentData.id,_formData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                window.location.reload();
            }
        });
    };

    return (
        <div>
            <Card className="mt-3 mx-3">
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