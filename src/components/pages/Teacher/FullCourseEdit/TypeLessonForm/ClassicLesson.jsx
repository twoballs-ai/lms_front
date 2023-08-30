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
import Editor from "../../../../Editor";
import { apiUrl, typesApiUrl } from "../../../../../shared/config";
function AddingClassicLesson(props) {
    const [setData, useSetData] = useState([]);
    let stage_id = props.stage_id
    const location = useLocation();
    const navigate = useNavigate();
    const [classicLessonData, setClassicLessonData] = useState({
        stage: stage_id,
        is_classic: true,
        image: "",
        content: "",
        file: "",
        video_link: "",
        url_link: "",
    });

    console.log(location.state);
    console.log()
    const handleChange = (event) => {
        setClassicLessonData({
            ...classicLessonData,
            [event.target.name]: event.target.value,
        });
        console.log(classicLessonData);
    };
    const handleFileChange = (event) => {
        setClassicLessonData({
            ...classicLessonData,
            [event.target.name]: event.target.files[0],
        });
    };
    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                typesApiUrl + "classic-lesson/" + stage_id,
                classicLessonData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                navigate(-2);
            });
    };
    return (
        <div>
            {location.state.type === "classicLesson" && (
                
                <Card>
                    <Card.Header>
                        Добавление классического урока
                    </Card.Header>
                    <Card.Body>
                    <div className="App">

<Editor  />

    </div>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>Добавление картинки</Form.Label>
                                <Form.Control
                                    name="image"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>Содержание урока</Form.Label>
                                <Form.Control
                                    name="content"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Описание"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>Добавление файла</Form.Label>
                                <Form.Control
                                    name="file"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicCategory"
                            >
                                <Form.Label>
                                    Добавление ссылки на видео
                                </Form.Label>
                                <Form.Control
                                    name="video_link"
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
                                    Добавление ссылки на сторонний ресурс
                                </Form.Label>
                                <Form.Control
                                    name="url_link"
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
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

export default AddingClassicLesson