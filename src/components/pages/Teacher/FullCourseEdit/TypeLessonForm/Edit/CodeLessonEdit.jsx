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
function EditCodeLesson(props) {
    let stage_id = props.stage_id
    const location = useLocation();
    const navigate = useNavigate();
    const [programmingLessonData, setProgrammingLessonData] = useState({
        stage: stage_id,
        is_video: true,
        video_lesson: "",
        description: ""
 
    });

    console.log(location.state);
 
    const handleChange = (event) => {
        setProgrammingLessonData({
            ...programmingLessonData,
            [event.target.name]: event.target.value,
        });
        console.log(programmingLessonData);
    };

    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                typesApiUrl + "video-lesson/" + stage_id,
                programmingLessonData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                console.log(response.status)
                window.location.reload();
            });
    };
    return (
        <div>
        
                <Card>
                    <Card.Header>
                        Добавление урока на программирование
                    </Card.Header>
                    <Card.Body>
                        <Form>
                    
   
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

export default EditCodeLesson