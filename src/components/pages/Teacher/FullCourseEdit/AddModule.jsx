import React from 'react';
import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import { apiUrl } from "../../../../shared/config";

function AddModule() {
    // const teacherId= localStorage.getItem('teacherId')
    const { chapter_id } = useParams();
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
    }, [chapter_id]);

    console.log(chapter_id);
    const handleChange = (event) => {
        setChapterAddData({
            ...chapterAddData,
            [event.target.name]: event.target.value,
        });
        console.log(chapterAddData);
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
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Ваши данные обновлены",
                        toast: true,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        timer: 30,
                    });
                    window.location.reload();
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
