import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import axios from "axios";
import { apiLmsUrl } from "../../../../../shared/config";
import SiteService from '../../../../../services/site.service';
import TeacherService from '../../../../../services/teacher.service';
import "./AddCourse.scss"; // Импорт стилей SCSS
import LmsButton from '../../../../reUseComponents/Button';
import CustomSelect from '../../../../reUseComponents/Select';
import TextInput from '../../../../reUseComponents/TextInput';

function AddCourse() {
    // const teacherId = localStorage.getItem("user");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    // const [courseAddData, setCourseAddData] = useState({
    //     category: 1,
    //     title: "",
    //     description: "",
    //     // course_image: "",
    //     // technologicals: "",
    // });

    useEffect(() => {
        const fetchData = async () => {
            await SiteService.getCategory({ toSelect: true }).then((response) => {
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
    const handleSelectChange = (selectedValues) => {
        setSelectedCategories(selectedValues);
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
            <CustomSelect mode="single" options={categories}  placeholder ={"ddddd"} onChange={handleSelectChange} style={{ width: '100%' }}/>
 <p>Название курса:</p>
        <TextInput isTextArea={false} />


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
