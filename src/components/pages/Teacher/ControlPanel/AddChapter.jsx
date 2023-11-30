import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiUrl } from "../../../../shared/config";
import CourseEditorService from "../../../../services/course.editor.service";

function AddChapter() {
    const { course_id } = useParams();
    const [chapterAddData, setChapterAddData] = useState({
        course: course_id,
        title: "",
        description: "",
        chapter_modules:[],
    });
    const handleChange = (event) => {
        setChapterAddData({
            ...chapterAddData,
            [event.target.name]: event.target.value,
        });
        console.log(chapterAddData);
    };

    // const handleFileChange=(event)=>{
    //   setChapterAddData({
    //     ...chapterAddData,
    //     [event.target.name]:event.target.files[0]
    //   })
    // }
    const formSubmit = async (e) => {
        e.preventDefault();
        const response = await CourseEditorService.editCoursePageAddChapter(course_id, chapterAddData)
        if (response.status === 200 || response.status === 201) {
            console.log(response.status)
            // window.location.reload();
        }

    };
    return (
        <>
            <Card>
                <Card.Header>Добавление главы</Card.Header>
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
export default AddChapter;
