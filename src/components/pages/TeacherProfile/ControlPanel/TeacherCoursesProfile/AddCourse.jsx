import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import axios from "axios";
import { apiLmsUrl } from "../../../../../shared/config";
import SiteService from '../../../../../services/siteNoAuth.service';
import TeacherService from '../../../../../services/teacher.service';
import "./AddCourse.scss"; // Импорт стилей SCSS
import LmsButton from '../../../../reUseComponents/Button';
import CustomSelect from '../../../../reUseComponents/Select';
import TextInput from '../../../../reUseComponents/TextInput';

function AddCourse() {
    // const teacherId = localStorage.getItem("user");
    const [categories, setCategories] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputDescrValue, setInputDescreValue] = useState('');
    const handleInputChange = (e) => {
        setInputTitleValue(e.target.value);
    };


    const handleInputDescrChange = (e) => {
        setInputDescreValue(e.target.value);
    };
    const handleSelectChange = (selectedValues) => {
        setSelectedCategories(selectedValues);
    };
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


    const divSubmit = async (e) => {
        e.preventDefault();
        const response = await TeacherService.addCourse({
            category: selectedCategories,
            title: inputTitleValue,
            description: inputDescrValue
        });
        if (response.status === 200 || response.status === 201) {
            console.log(response.status);
            // window.location.href = "/teacher-profile/my-courses";
        }
    };
    return (
        <div className="add-course-container"> {/* Изменим класс контейнера */}
        <div className="add-course-container__title">Добавление курса</div>
   
            <div className="add-course-container__add-form">
            <CustomSelect mode="single" options={categories}  placeholder ={"Выберите категорию"} onChange={handleSelectChange} style={{ width: '100%' }}/>
        <p>Название курса:</p>
        <TextInput isTextArea={false} placeholder={"Напишите сюда название курса"} value={inputTitleValue} onChange={handleInputChange}/>
        <p>Описание курса:</p>
        <TextInput type={'textarea'} placeholder={"Напишите сюда описание курса"} value={inputDescrValue} onChange={handleInputDescrChange}/>
                <LmsButton buttonText={"Создать"} handleClick={divSubmit} />
            </div>
        </div>
    );
}

export default AddCourse;
