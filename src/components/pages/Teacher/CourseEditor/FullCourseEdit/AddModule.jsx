import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import CourseEditorService from '../../../../../services/course.editor.service'
// import { apiLmsUrl } from '../../../../shared/config'
function AddModule() {
    // const teacherId= localStorage.getItem('teacherId')
    const { chapter_id } = useParams();
    let { course_id } = useParams();
    const navigate = useNavigate();
    const [chapterAddData, setChapterAddData] = useState({
        chapter: chapter_id,
        course: course_id,
        title: "",
        description: "",
        stage_modules:[],
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

    const formSubmit = async (e) => {
        e.preventDefault();
        
        const response = await CourseEditorService.editCoursePageAddModule(chapter_id, chapterAddData)
        if (response.status === 200 || response.status === 201) {
            const data =  {
                module: response.data.id,
                course: course_id,
                stage_numbers:1
            }
            const responseNext = await CourseEditorService.editCoursePageAddModuleStage(response.data.id, data)
            if (responseNext.status === 200 || responseNext.status === 201) {
                console.log(response)
                navigate(
                    `/edit-course-full/edit-module/${course_id}/${responseNext.data.module}/stage/1`
                );
            }
            // console.log(response)
            // try {
            //     axios
            //         .post(
            //             apiUrl + "module-stage/" + response.data.id,
            //             {
            //                 module: response.data.id,
            //                 stage_numbers:1
            //             },
            //             // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
            //             { headers: { "Content-Type": "multipart/form-data" } }
            //         )
            //         .then((response) => {
            //             if (response.status === 200 || response.status === 201) {
                          
            //                 navigate(
            //                     `/edit-course-full/edit-module/${course_id}/${response.data.module}/stage/1`
            //                 );
            //             }
            //         });
            // } catch (error) {
            //     console.log(error);
            // }
        }

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
