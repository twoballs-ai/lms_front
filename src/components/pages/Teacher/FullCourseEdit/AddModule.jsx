import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { apiUrl } from "../../../../shared/config";
import { useLocation, useNavigate } from 'react-router-dom';
function AddModule() {
    // const teacherId= localStorage.getItem('teacherId')
    const { chapter_id } = useParams();
    let { course_id } = useParams();
    const navigate = useNavigate();
    const [chapterAddData, setChapterAddData] = useState({
        chapter: chapter_id,
        title: "",
        description: "",
    });
    useEffect(() => {
        setChapterAddData({
            ...chapterAddData,
            chapter: chapter_id,
        });
    }, [chapter_id,navigate]);

    // console.log(chapter_id);
    const handleChange = (event) => {
        setChapterAddData({
            ...chapterAddData,
            [event.target.name]: event.target.value,
        });
        // console.log(chapterAddData);
    };

    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                apiUrl + "chapter-module/" + chapter_id,
                chapterAddData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    
                    try {
                        axios
                            .post(
                                apiUrl + "module-stage/" + response.data.id,
                                {
                                    module: response.data.id,
                                    stage_numbers:1
                                },
                                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                                { headers: { "Content-Type": "multipart/form-data" } }
                            )
                            .then((response) => {
                                if (response.status === 200 || response.status === 201) {
                                  
                                    navigate(
                                        `/edit-course-full/edit-module/${course_id}/${response.data.module}/stage/1`
                                    );
                                }
                            });
                    } catch (error) {
                        console.log(error);
                    }
                }

                // window.location.href='/teacher-profile/my-courses'
            });
    };

    return (
        <>
            <Card>
                <Card.Header>Добавление модуля для главы: </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                placeholder="Описание"
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
        </>
    );
}
export default AddModule;
