"use client"; 
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup'; // Для валидации
import SiteService from '@/services/siteNoAuth.service';
import TeacherService from '@/services/teacher.service';
import "./AddCourse.scss"; // Импорт стилей
import LmsButton from '@/components/reUseComponents/LmsButton';
import CustomSelect from '@/components/reUseComponents/Select';
import TextInput from '@/components/reUseComponents/TextInput';
import FileUpload from '@/components/reUseComponents/FileUpload';
import { useRouter } from 'next/navigation'; // Хук для навигации

// Определение типов для состояний
interface Category {
  id: string;
  name: string;
}

interface FormErrors {
  selectedCategories?: string;
  inputTitleValue?: string;
  inputDescrValue?: string;
  uploadedFile?: string;
}

const AddCourse: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [inputTitleValue, setInputTitleValue] = useState<string>('');
  const [inputDescrValue, setInputDescrValue] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({}); // Хранение ошибок валидации

  useEffect(() => {
    document.title = 'Профиль учителя - добавление курса - coursero.ru';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await SiteService.getCategory({ toSelect: true });
      if (response.status === 200 || response.status === 201) {
        setCategories(response.data.data);
      }
    };
    fetchData();
  }, []);

  // Валидация с помощью Yup
  const schema = Yup.object().shape({
    selectedCategories: Yup.string().required('Выберите категорию'),
    inputTitleValue: Yup.string()
      .required('Введите название курса')
      .min(5, 'Название курса должно содержать не менее 3 символов')
      .max(100, 'Название курса должно содержать не более 50 символов'),
    inputDescrValue: Yup.string()
      .required('Введите описание курса')
      .min(10, 'Описание курса должно содержать не менее 10 символов'),
    uploadedFile: Yup.mixed()
      .required('Загрузите изображение курса')
      .test('fileSize', 'Размер файла слишком большой', value => !value || (value.size <= 5000000)) // Макс. 5MB
      .test('fileType', 'Неподдерживаемый формат файла', value => !value || ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitleValue(e.target.value);
  };

  const handleInputDescrChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputDescrValue(e.target.value);
  };

  const handleSelectChange = (selectedValues: string) => {
    setSelectedCategories(selectedValues);
  };

  const handleFileChange = (files: { file: File }[]) => {
    if (files.length > 0) {
      setUploadedFile(files[0].file);
    }
  };

  const divSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate({
        selectedCategories,
        inputTitleValue,
        inputDescrValue,
        uploadedFile,
      }, { abortEarly: false });

      const formData = new FormData();
      formData.append('category', selectedCategories);
      formData.append('title', inputTitleValue);
      formData.append('description', inputDescrValue);
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }

      const response = await TeacherService.addCourse(formData);
      if (response.status === 200 || response.status === 201) {
        router.push("/teacher-profile/my-courses");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrorsObj: FormErrors = {};
        error.inner.forEach((err: Yup.ValidationError) => {
          if (err.path) {
            validationErrorsObj[err.path] = err.message;
          }
        });
        setErrors(validationErrorsObj);
      } else {
        console.error("Error during form submission:", error);
      }
    }
  };

  return (
    <div className="add-course-container">
      <div className="add-course-container__title">Добавление курса</div>
      <div className="add-course-container__add-form">
        <CustomSelect 
          mode="single" 
          options={categories} 
          placeholder={"Выберите категорию"} 
          onChange={handleSelectChange} 
          style={{ width: '100%' }} 
        />
        {errors.selectedCategories && <span className="error">{errors.selectedCategories}</span>}
        
        <p>Название курса:</p>
        <TextInput 
          isTextArea={false} 
          placeholder={"Напишите сюда название курса"} 
          value={inputTitleValue} 
          onChange={handleInputChange} 
        />
        {errors.inputTitleValue && <span className="error">{errors.inputTitleValue}</span>}
        
        <p>Описание курса:</p>
        <TextInput 
          type="textarea" 
          placeholder={"Напишите сюда описание курса"} 
          value={inputDescrValue} 
          onChange={handleInputDescrChange} 
        />
        {errors.inputDescrValue && <span className="error">{errors.inputDescrValue}</span>}
        
        <p>Изображение курса:</p>
        <FileUpload 
          fileType="image" 
          selectionMode="single" 
          onFilesChange={handleFileChange} 
          errors={errors.uploadedFile} 
        />
        {errors.uploadedFile && <span className="error">{errors.uploadedFile}</span>}
        
        <LmsButton buttonText="Создать" handleClick={divSubmit} />
      </div>
    </div>
  );
};

export default AddCourse;
