import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { apiLmsUrl } from "../../../../shared/config";
import SiteService from '../../../../services/site.service';
import TeacherService from '../../../../services/teacher.service';

function AddCourse() {
    const teacherId = localStorage.getItem("user");
    const [categories, setCategories] = useState([]);
    const [courseAddData, setCourseAddData] = useState({
        category: 1,
        teacher: teacherId,
        title: "",
        description: "",
        course_image: "",
        technologicals: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            await SiteService.getCategory().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setCategories(response.data);
                }
            });
        }
        fetchData()
    }, []);

    const handleChange = (event) => {
        setCourseAddData({
            ...courseAddData,
            [event.target.name]: event.target.value,
        });
        console.log(courseAddData);
    };

    const handleFileChange = (event) => {
        setCourseAddData({
            ...courseAddData,
            [event.target.name]: event.target.files[0],
        });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const response = await TeacherService.addCourse(courseAddData)
        if (response.status === 200 || response.status === 201) {
            console.log(response.status)
        window.location.href = "/teacher-profile/my-courses";
        }
       
    };
    return (
        <>
            <Card className="border border-0 shadow ">
                <Card.Header>Добавление курса</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="categorySelect">
                                Выберите категорию.
                            </Form.Label>
                            <Form.Select
                                id="categorySelect"
                                name="category"
                                onChange={handleChange}
                            >
                                <option>Выберите категорию</option>
                                {categories.map((category, index) => {
                                    return (
                                        <option key={index} value={category.id}>
                                            {category.title}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                name="title"
                                value={categories.title}
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Описание курса</Form.Label>
                            <Form.Control
                                name="description"
                                value={categories.description}
                                as="textarea"
                                rows={3}
                                placeholder="Описание"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>
                                Добавить заглавную картинку курса
                            </Form.Label>
                            <Form.Control
                                name="course_image"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Технологии</Form.Label>
                            <Form.Control
                                name="technologicals"
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
export default AddCourse;
