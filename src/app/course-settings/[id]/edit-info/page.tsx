"use client"; // Для client-side рендеринга в Next.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import * as Yup from 'yup';
import TeacherService from '@/services/teacher.service';
import LmsButton from '@/components/reUseComponents/LmsButton';
import TextInput from '@/components/reUseComponents/TextInput';
import FileUpload from '@/components/reUseComponents/FileUpload';
import { serverUrl } from '@/shared/config';
import Image from 'next/image'; // Import Image component
import './EditCourse.scss'; // Import SCSS styles

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Название курса обязательно')
        .min(3, 'Название курса должно содержать не менее 3 символов')
        .max(50, 'Название курса должно содержать не более 50 символов'),
    description: Yup.string()
        .required('Описание курса обязательно')
        .min(10, 'Описание курса должно содержать не менее 10 символов'),
    file: Yup.mixed()
        .test('fileSize', 'Размер файла слишком большой', value => !value || (value.size <= 5000000)) // max 5MB
        .test('fileType', 'Неподдерживаемый формат файла', value => !value || ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
});

function EditCourse() {
    const params = useParams();
    const course_id = params.id;
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputDescrValue, setInputDescrValue] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [courseImage, setCourseImage] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitleValue(e.target.value);
    };

    const handleInputDescrChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputDescrValue(e.target.value);
    };

    const handleFileChange = (files: { file: File }[]) => {
        if (files.length > 0) {
            setUploadedFile(files[0].file);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await TeacherService.getCourseById(course_id);
            if (response.status === 200 || response.status === 201) {
                const data = response.data.data;
                setInputTitleValue(data.course.title); // Prefill title
                setInputDescrValue(data.course.description); // Prefill description
                setCourseImage(data.course.cover_path); // Prefill image
            }
        };
        fetchData();
    }, [course_id]); // Include course_id in dependency array

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create a form data object
        const formDataObj = new FormData();
        formDataObj.append('title', inputTitleValue);
        formDataObj.append('description', inputDescrValue);
        if (uploadedFile) {
            formDataObj.append('file', uploadedFile);
        }

        // Validate form data using Yup
        try {
            await validationSchema.validate({
                title: inputTitleValue,
                description: inputDescrValue,
                file: uploadedFile
            }, { abortEarly: false });
            setErrors({});

            const response = await TeacherService.updateCourse(course_id, formDataObj);
            if (response.status === 200 || response.status === 201) {
                // Handle success response
            }
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc: { [key: string]: string }, error: Yup.ValidationError) => {
                return { ...acc, [error.path || '']: error.message };
            }, {});
            setErrors(formattedErrors);
        }
    };

    return (
        <div className="edit-course-container">
            <div className="edit-course-container__title">Редактирование курса</div>
            <div className='edit-course-container_block'>
                <div className="edit-course-container__add-form">
                    <p>Название курса:</p>
                    <TextInput
                        isTextArea={false}
                        placeholder={"Напишите сюда название курса"}
                        value={inputTitleValue}
                        onChange={handleInputChange}
                    />
                    {errors.title && <div className="error-message">{errors.title}</div>}
                    <p>Описание курса:</p>
                    <TextInput
                        type={'textarea'}
                        placeholder={"Напишите сюда описание курса"}
                        value={inputDescrValue}
                        onChange={handleInputDescrChange}
                    />
                    {errors.description && <div className="error-message">{errors.description}</div>}
                    <p>Изображение курса:</p>
                    {courseImage && (
                        <div className="current-image">
                            <p>Текущее изображение:</p>
                            <Image
                                src={`${serverUrl}/${courseImage}`}
                                alt="Course Cover"
                                className="course-image"
                                width={200} // Set a specific width
                                height={240} // Set a specific height
                            />
                        </div>
                    )}
                    <div style={{ padding: 24 }}>
                        <FileUpload 
                            fileType="image" 
                            selectionMode="single" 
                            onFilesChange={handleFileChange}
                            errors={errors.file} 
                        />
                    </div>
                    <LmsButton buttonText={"Обновить"} handleClick={handleUpdate} />
                </div>
            </div>
        </div>
    );
}

export default EditCourse;
