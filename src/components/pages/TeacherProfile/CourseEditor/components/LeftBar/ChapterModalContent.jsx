import React, { useState } from 'react';
import * as Yup from 'yup';
import TextInput from '../../../../../reUseComponents/TextInput';
import ReusableSwitch from '../../../../../reUseComponents/Switcher';
import ReusableSliderWithInput from '../../../../../reUseComponents/Slider';
import LmsButton from '../../../../../reUseComponents/Button';

// Yup validation schema
const ChapterSchema = Yup.object().shape({
    inputTitleValue: Yup.string().required('Название главы обязательно'),
    inputDescrValue: Yup.string().required('Описание главы обязательно'),
    isExam: Yup.boolean(),
    examDuration: Yup.number()
});

const ChapterModalContent = ({
    inputTitleValue,
    inputDescrValue,
    isExam,
    examDuration,
    handleInputChange,
    handleInputDescrChange,
    handleIsExamChange,
    handleExamDurationChange,
    addChapter,
    previousChapterId,
}) => {
    const [errors, setErrors] = useState({});

    const validate = async () => {
        try {
            await ChapterSchema.validate({
                inputTitleValue,
                inputDescrValue,
                isExam,
                examDuration
            }, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            const newErrors = {};
            err.inner.forEach(error => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleAddChapter = async () => {
        const isValid = await validate();
        if (isValid) {
            addChapter();
        }
    };

    return (
        <>
            <h2>Вы добавляете главу</h2>
            <p>Название главы:</p>
            <TextInput
                isTextArea={false}
                placeholder="Напишите сюда название главы"
                value={inputTitleValue}
                onChange={handleInputChange}
            />
            {errors.inputTitleValue && <p style={{ color: 'red' }}>{errors.inputTitleValue}</p>}
            
            <p>Описание главы:</p>
            <TextInput
                type="textarea"
                placeholder="Напишите сюда описание главы"
                value={inputDescrValue}
                onChange={handleInputDescrChange}
            />
            {errors.inputDescrValue && <p style={{ color: 'red' }}>{errors.inputDescrValue}</p>}
            
            <p>Является ли ваша глава экзаменом?</p>
            <ReusableSwitch
                defaultChecked={isExam}
                onChange={handleIsExamChange}
            />
            {errors.isExam && <p style={{ color: 'red' }}>{errors.isExam}</p>}
            
            {isExam && (
                <div>
                    <p>Продолжительность экзамена (в часах):</p>
                    <ReusableSliderWithInput
                        defaultValue={examDuration}
                        min={0}
                        max={48}
                        value={examDuration}
                        onChange={handleExamDurationChange}
                        style={{ marginBottom: '20px', width: '50%' }}
                        inputStyle={{ backgroundColor: '#f0f0f0' }}
                        sliderStyle={{ marginRight: '10px' }}
                    />
                    {errors.examDuration && <p style={{ color: 'red' }}>{errors.examDuration}</p>}
                </div>
            )}
            
            <LmsButton buttonText="Создать" handleClick={handleAddChapter} />
        </>
    );
};

export default ChapterModalContent;