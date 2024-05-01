import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import axios from "axios";
import { apiLmsUrl } from "../../../../../shared/config";
import SiteService from '../../../../../services/site.service';
import TeacherService from '../../../../../services/teacher.service';
import "./AddCourse.scss"; // Импорт стилей SCSS
import LmsButton from '../../../../reUseComponents/Button';

function AddCourse() {
    const teacherId = localStorage.getItem("user");
    const [categories, setCategories] = useState([]);
    const [courseAddData, setCourseAddData] = useState({
        category: 1,
        title: "",
        description: "",
        // course_image: "",
        // technologicals: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            await SiteService.getCategory().then((response) => {
                if (response.status === 200 || response.status === 201) {
                    console.log(response.data.data)
                    setCategories(response.data.data);
                }
            });
        }
        fetchData();
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

    const divSubmit = async (e) => {
        e.preventDefault();
        const response = await TeacherService.addCourse(courseAddData)
        if (response.status === 200 || response.status === 201) {
            console.log(response.status)
            window.location.href = "/teacher-profile/my-courses";
        }

    };
    return (
        <div className="add-course-container"> {/* Изменим класс контейнера */}
            <h2>Добавление курса</h2>
            <div>
                <div className="mb-3">
                    <label htmlFor="categorySelect">Выберите категорию:</label>
                    <select
                        id="categorySelect"
                        name="category"
                        className="form-select"
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
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="titleInput">Название:</label>
                    <input
                        id="titleInput"
                        name="title"
                        value={categories.title}
                        type="text"
                        className="form-control"
                        placeholder="Название курса"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="descriptionTextarea">Описание курса:</label>
                    <textarea
                        id="descriptionTextarea"
                        name="description"
                        value={categories.description}
                        className="form-control"
                        rows={3}
                        placeholder="Описание курса"
                        onChange={handleChange}
                    />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="courseImageInput">Добавить заглавную картинку курса:</label>
                    <input
                        id="courseImageInput"
                        name="course_image"
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div> */}
                {/* <div className="mb-3">
                    <label htmlFor="technologicalsTextarea">Технологии:</label>
                    <textarea
                        id="technologicalsTextarea"
                        name="technologicals"
                        className="form-control"
                        rows={3}
                        placeholder="Технологии"
                        onChange={handleChange}
                    />
                </div> */}
                <LmsButton buttonText={"Создать"} handleClick={divSubmit} />
            </div>
        </div>
    );
}

export default AddCourse;
