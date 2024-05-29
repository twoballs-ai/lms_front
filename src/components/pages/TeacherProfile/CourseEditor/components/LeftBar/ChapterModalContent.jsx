import React from 'react';
import TextInput from '../../../../../reUseComponents/TextInput';
import ReusableSwitch from '../../../../../reUseComponents/Switcher';
import ReusableSliderWithInput from '../../../../../reUseComponents/Slider';
import LmsButton from '../../../../../reUseComponents/Button';

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
}) => (
    <>
        <h2>Вы добавляете главу</h2>
        <p>Название главы:</p>
        <TextInput
            isTextArea={false}
            placeholder={"Напишите сюда название главы"}
            value={inputTitleValue}
            onChange={handleInputChange}
        />
        <p>Описание главы:</p>
        <TextInput
            isTextArea={true}
            placeholder={"Напишите сюда описание главы"}
            value={inputDescrValue}
            onChange={handleInputDescrChange}
        />

        <p>Является ли ваша глава экзаменом?</p>
        <ReusableSwitch
            defaultChecked={isExam}
            onChange={handleIsExamChange}
        />
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
            </div>
        )}
        <LmsButton buttonText={"Создать"} handleClick={addChapter} />
    </>
);

export default ChapterModalContent;