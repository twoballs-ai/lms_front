import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'; // Import Yup for validation
import SiteService from '../../../../../services/siteNoAuth.service';
import TeacherService from '../../../../../services/teacher.service';
import "./AddCourse.scss"; // Import SCSS styles
import LmsButton from '../../../../reUseComponents/Button';
import CustomSelect from '../../../../reUseComponents/Select';
import TextInput from '../../../../reUseComponents/TextInput';
import FileUpload from '../../../../reUseComponents/FileUpload';

function AddCourse() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("");
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputDescrValue, setInputDescrValue] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errors, setErrors] = useState({}); // State to store validation errors

    useEffect(() => {
        const fetchData = async () => {
            await SiteService.getCategory({ toSelect: true }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    setCategories(response.data.data);
                }
            });
        };
        fetchData();
    }, []);

    const schema = Yup.object().shape({
        selectedCategories: Yup.string().required('Выберите категорию'),
        inputTitleValue: Yup.string().required('Введите название курса'),
        inputDescrValue: Yup.string().required('Введите описание курса'),
        uploadedFile: Yup.mixed().required('Загрузите изображение курса'),
    });

    const handleInputChange = (e) => {
        setInputTitleValue(e.target.value);
    };

    const handleInputDescrChange = (e) => {
        setInputDescrValue(e.target.value);
    };

    const handleSelectChange = (selectedValues) => {
        console.log(selectedValues)
        setSelectedCategories(selectedValues);
    };

    const handleFileChange = (files) => {
        if (files.length > 0) {
            setUploadedFile(files[0].file);
        }
    };
console.log(categories)
    const divSubmit = async (e) => {
        e.preventDefault();

        try {
            await schema.validate({
                selectedCategories,
                inputTitleValue,
                inputDescrValue,
                uploadedFile,
            }, { abortEarly: false }); // Validate all fields

            const formData = new FormData();
            formData.append('category', selectedCategories);
            formData.append('title', inputTitleValue);
            formData.append('description', inputDescrValue);
            formData.append('file', uploadedFile);

            const response = await TeacherService.addCourse(formData);
            if (response.status === 200 || response.status === 201) {
                navigate("/teacher-profile/my-courses");
            }
        } catch (validationErrors) {
            const errors = {};
            validationErrors.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            setErrors(errors);
        }
    };

    return (
        <div className="add-course-container">
            <div className="add-course-container__title">Добавление курса</div>
            <div className="add-course-container__add-form">
                <CustomSelect mode="single" options={categories} placeholder={"Выберите категорию"} onChange={handleSelectChange} style={{ width: '100%' }} />
                {errors.selectedCategories && <span className="error">{errors.selectedCategories}</span>}
                <p>Название курса:</p>
                <TextInput isTextArea={false} placeholder={"Напишите сюда название курса"} value={inputTitleValue} onChange={handleInputChange} />
                {errors.inputTitleValue && <span className="error">{errors.inputTitleValue}</span>}
                <p>Описание курса:</p>
                <TextInput type={'textarea'} placeholder={"Напишите сюда описание курса"} value={inputDescrValue} onChange={handleInputDescrChange} />
                {errors.inputDescrValue && <span className="error">{errors.inputDescrValue}</span>}
                <p>Изображение курса:</p>
                <FileUpload fileType="image" selectionMode="single" onFilesChange={handleFileChange} />
                {errors.uploadedFile && <span className="error">{errors.uploadedFile}</span>}
                <LmsButton buttonText={"Создать"} handleClick={divSubmit} />
            </div>
        </div>
    );
}

export default AddCourse;
