import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import TeacherService from '../../../../../services/teacher.service';
import "./EditCourse.scss"; // Импорт стилей SCSS
import LmsButton from '../../../../reUseComponents/Button';
import TextInput from '../../../../reUseComponents/TextInput';
import FileUpload from '../../../../reUseComponents/FileUpload';
import { serverUrl } from '../../../../../shared/config';

function EditCourse() {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputDescrValue, setInputDescrValue] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [courseImage, setCourseImage] = useState('');
    let { course_id } = useParams();

    const handleInputChange = (e) => {
        setInputTitleValue(e.target.value);
    };

    const handleInputDescrChange = (e) => {
        setInputDescrValue(e.target.value);
    };

    const handleFileChange = (files) => {
        if (files.length > 0) {
            setUploadedFile(files[0].file);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await TeacherService.getCourseById(course_id);
            if (response.status === 200 || response.status === 201) {
                const data = response.data.data;
                setCourseData(data);
                setInputTitleValue(data.course.title); // Prefill title
                setInputDescrValue(data.course.description); // Prefill description
                setCourseImage(data.course.cover_path); // Prefill image
            }
        };
        fetchData();
    }, [course_id]);

    const divSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('category', selectedCategories);
        formData.append('title', inputTitleValue);
        formData.append('description', inputDescrValue);
        formData.append('file', uploadedFile);

        const response = await TeacherService.addCourse(formData);
        if (response.status === 200 || response.status === 201) {
            navigate("/teacher-profile/my-courses");
        }
    };

    return (
        <div className="edit-course-container">
            <div className="edit-course-container__title">Редактирование курса</div>
            <div className="edit-course-container__add-form">
                <p>Название курса:</p>
                <TextInput
                    isTextArea={false}
                    placeholder={"Напишите сюда название курса"}
                    value={inputTitleValue}
                    onChange={handleInputChange}
                />
                <p>Описание курса:</p>
                <TextInput
                    type={'textarea'}
                    placeholder={"Напишите сюда описание курса"}
                    value={inputDescrValue}
                    onChange={handleInputDescrChange}
                />
                <p>Изображение курса:</p>
                {courseImage && (
                    <div className="current-image">
                        <p>Текущее изображение:</p>
                        <img src={`${serverUrl}/${courseImage}`} alt="Course Cover" className="course-image" />
                    </div>
                )}
                <div style={{ padding: 24 }}>
                    <FileUpload fileType="image" selectionMode="single" onFilesChange={handleFileChange} />
                </div>
                <LmsButton buttonText={"Сохранить"} handleClick={divSubmit} />
            </div>
        </div>
    );
}

export default EditCourse;