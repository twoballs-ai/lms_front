import React, { useState, useEffect } from "react";
import Editor from "../../../../../Editor";
import CourseEditorService from "../../../../../../services/course.editor.service";
import LmsButton from "../../../../../reUseComponents/Button";
import TextInput from "../../../../../reUseComponents/TextInput";
import { Radio } from 'antd';
import { Button } from 'antd';

import "./LessonsStyle.scss";
import { DeleteOutlined } from '@ant-design/icons';
function AddingQuizLesson(props) {
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [quizType, setQuizType] = useState('radio');
    const [questions, setQuestions] = useState([{ question_text: '', is_true_answer: false }]);

    const [inputDescrValue, setInputDescreValue] = useState('');
    const handleInputChange = (e) => {
      setInputTitleValue(e.target.value);
    };

  
    const handleInputDescrChange = (e) => {
      setInputDescreValue(e.target.value);
    };
    const handleQuizTypeChange = (e) => {
        setQuizType(e.target.value);
        // Reset is_true_answer for all questions
        const resetQuestions = questions.map(q => ({ ...q, is_true_answer: false }));
        setQuestions(resetQuestions);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'is_true_answer' && quizType === 'radio') {
            newQuestions.forEach((q, i) => { q.is_true_answer = i === index ? value : false; });
        } else {
            newQuestions[index][field] = value;
        }
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question_text: '', is_true_answer: false }]);
    };

    const deleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const [stageEditorData, setStageEditorData] = useState('');
    const [showQuizLesson, setShowQuizLesson] = useState(false);
    let stagePk = props.selectedStage ? props.selectedStage.id : null;

    useEffect(() => {
        if (stagePk) {
            setStageEditorData('');
            const fetchData = async () => {
                await CourseEditorService.editCoursePageGetLesson(stagePk).then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        if (response.data.lesson) {
                            setInputTitleValue(response.data.title);
                            setShowQuizLesson(true);
                        } else {
                            setInputTitleValue("");
                            setShowQuizLesson(true);
                        }
                    }
                });
            };
            fetchData();
        }
    }, [props, stagePk]);

    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {
            stage_id: stagePk,
            html_code_text: stageEditorData,
            title: inputTitleValue,
            quiz_type: quizType,
            questions: questions
        };

        const response = await CourseEditorService.editCoursePageUpdateClassicLesson(data);
        if (response.status === 200 || response.status === 201) {
            setInputTitleValue(response.data.data.title);
        }
    };

    return (
        <>
            {showQuizLesson && (
                <div className={`content__${props.selectedStage.type}-lesson`}>
                    <div className={`${props.selectedStage.type}-lesson__title`}>
                        <p>Квиз</p>
                    </div>
                    <div className={`${props.selectedStage.type}-lesson__add-block`}>
                        <p>Название урока:</p>
                        <TextInput isTextArea={false} placeholder={"Напишите сюда название этапа"} value={inputTitleValue} onChange={handleInputChange} />
                        <div className="add-block__editor">
                            <p>Напишите сюда ваш вопрос:</p>
                            <TextInput type={'textarea'} placeholder={"Напишите сюда описание модуля"} value={inputDescrValue} onChange={handleInputDescrChange} />

                            <p>Тип квиза:</p>
                            <Radio.Group defaultValue={quizType} buttonStyle="solid" onChange={handleQuizTypeChange}>
                                <Radio.Button value="radio">Выбрать квиз с одним правильным ответом</Radio.Button>
                                <Radio.Button value="checkbox">Выбрать квиз где можно выбирать любое количество правильных ответов</Radio.Button>
                            </Radio.Group>

                            <p>Ответы:</p>
                            {questions.map((question, index) => (
                                <div key={index} className="question-item">
                                    {quizType === 'radio' ? (
                                        <input
                                            type="radio"
                                            checked={question.is_true_answer}
                                            onChange={(e) => handleQuestionChange(index, 'is_true_answer', e.target.checked)}
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            checked={question.is_true_answer}
                                            onChange={(e) => handleQuestionChange(index, 'is_true_answer', e.target.checked)}
                                        />
                                    )}
                                    <TextInput
                                        isTextArea={false}
                                        placeholder={`Вопрос ${index + 1}`}
                                        value={question.question_text}
                                        onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
                                    />
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => deleteQuestion(index)} // добавить функцию для удаления вопроса
                                    />
                                </div>
                            ))}
                            <LmsButton buttonText={"Добавить вопрос"} handleClick={addQuestion} />
                        </div>

                        <div className="add-block__button">
                            <LmsButton buttonText={"сохранить"} handleClick={formSubmit} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddingQuizLesson;
