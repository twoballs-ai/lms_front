import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import TextInput from '@/components/reUseComponents/TextInput';
import ReusableSwitch from '@/components/reUseComponents/Switcher';
import ReusableSliderWithInput from '@/components/reUseComponents/Slider';
import LmsButton from '@/components/reUseComponents/Button';
import { addChapter } from '@/store/slices/courseEditorChapterSlice';

// Yup validation schema
const ChapterSchema = Yup.object().shape({
    inputTitleValue: Yup.string().required('Название главы обязательно'),
    inputDescrValue: Yup.string().required('Описание главы обязательно'),
    isExam: Yup.boolean(),

});

const AddChapterToCourse = ({ course_id, handleCloseModal }) => {
    console.log()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [inputDescrValue, setInputDescrValue] = useState('');
    const [isExam, setIsExam] = useState(false);
    const [examDuration, setExamDuration] = useState(10);
    const validate = async () => {
        try {
            await ChapterSchema.validate({
                inputTitleValue,
                inputDescrValue,
                isExam,
                // examDuration
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
            dispatch(addChapter({
                course_id,
                inputTitleValue,
                inputDescrValue,
                isExam,
                examDuration
            })).then(handleCloseModal);
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
                onChange={(e) => setInputTitleValue(e.target.value)}
            />
            {errors.inputTitleValue && <p style={{ color: 'red' }}>{errors.inputTitleValue}</p>}
            
            <p>Описание главы:</p>
            <TextInput
                isTextArea={true}
                placeholder="Напишите сюда описание главы"
                value={inputDescrValue}
                onChange={(e) => setInputDescrValue(e.target.value)}
            />
            {errors.inputDescrValue && <p style={{ color: 'red' }}>{errors.inputDescrValue}</p>}
            
            <p>Является ли ваша глава экзаменом?</p>
            <ReusableSwitch
                defaultChecked={isExam}
                onChange={setIsExam}
            />
            
            {isExam && (
                <div>
                    <p>Продолжительность экзамена (в часах):</p>
                    <ReusableSliderWithInput
                        defaultValue={examDuration}
                        min={1}
                        max={48}
                        value={examDuration}
                        onChange={setExamDuration}
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

export default AddChapterToCourse;
