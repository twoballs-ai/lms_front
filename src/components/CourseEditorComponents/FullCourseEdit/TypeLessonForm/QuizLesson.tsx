import React, { useState, useEffect } from "react";

import CourseEditorService from "@/services/course.editor.service";
import LmsButton from "@/components/reUseComponents/Button";
import TextInput from "@/components/reUseComponents/TextInput";
import { Radio, Button } from 'antd';
import { DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import "./LessonsStyle.scss";

function AddingQuizLesson(props) {
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [quizType, setQuizType] = useState('radio');
    const [answers, setAnswers] = useState([{ answer_text: '', is_true_answer: false, order: 0 }]);
    const [questionValue, setQuestionValue] = useState('');
    const [showQuizLesson, setShowQuizLesson] = useState(false);

    const handleInputChange = (e) => setInputTitleValue(e.target.value);

    const handleQuestionValue = (e) => setQuestionValue(e.target.value);

    const handleQuizTypeChange = (e) => {
        setQuizType(e.target.value);
        // Reset is_true_answer for all answers
        const resetAnswers = answers.map(q => ({ ...q, is_true_answer: false }));
        setAnswers(resetAnswers);
    };

    const handleQuestionChange = (index, field, value) => {
        const newAnswers = [...answers];
        if (field === 'is_true_answer' && quizType === 'radio') {
            newAnswers.forEach((q, i) => { q.is_true_answer = i === index ? value : false; });
        } else {
            newAnswers[index][field] = value;
        }
        setAnswers(newAnswers);
    };

    const addQuestion = () => {
        setAnswers([...answers, { answer_text: '', is_true_answer: false, order: answers.length }]);
    };

    const deleteQuestion = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index).map((q, i) => ({ ...q, order: i }));
        setAnswers(newAnswers);
    };

    const moveQuestion = (index, direction) => {
        const newAnswers = [...answers];
        const [movedAnswers] = newAnswers.splice(index, 1);
        newAnswers.splice(index + direction, 0, movedAnswers);
        setAnswers(newAnswers.map((q, i) => ({ ...q, order: i })));
    };

    const stagePk = props.selectedStage ? props.selectedStage.id : null;

    useEffect(() => {
        if (stagePk) {
            const fetchData = async () => {
                await CourseEditorService.editCoursePageGetLesson(stagePk).then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        if (response.data.lesson) {
                            console.log(response.data)
                            setInputTitleValue(response.data.title);
                            setShowQuizLesson(true);
                            setQuizType(response.data.lesson.quiz_type)
                            setQuestionValue(response.data.lesson.question)
                            const updatedAnswers = response.data.lesson.answers.map((q, index) => ({
                                // id: q.id,
                                answer_text: q.answer_text,
                                order: index,
                                is_true_answer: q.is_true_answer,
                                // quiz_id: q.quiz_id
                            }));
                            setAnswers(updatedAnswers);
                            
                        } else {
                            setInputTitleValue("");
                            setShowQuizLesson(true);
                            setQuestionValue("")
                            setQuizType('radio')
                            setAnswers([{ answer_text: '', is_true_answer: false, order: 0 }]);
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
            question:questionValue,
            title: inputTitleValue,
            quiz_type: quizType,
            answers: answers
        };

        const response = await CourseEditorService.editCoursePageUpdateQuizLesson(data);
        if (response.status === 200 || response.status === 201) {
            console.log(response.data)
            // setInputTitleValue(response.data.data.title);
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
                            <TextInput type={'textarea'} placeholder={"Напишите сюда ваш вопрос"} value={questionValue} onChange={handleQuestionValue} />

                            <p>Тип квиза:</p>
                            <Radio.Group defaultValue={quizType} buttonStyle="solid" onChange={handleQuizTypeChange}>
                                <Radio.Button value="radio">Выбрать квиз с одним правильным ответом</Radio.Button>
                                <Radio.Button value="checkbox">Выбрать квиз где можно выбирать любое количество правильных ответов</Radio.Button>
                            </Radio.Group>

                            <p>Ответы:</p>
                            {answers.map((question, index) => (
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
                                        placeholder={`Ответ ${index + 1}`}
                                        value={question.answer_text}
                                        onChange={(e) => handleQuestionChange(index, 'answer_text', e.target.value)}
                                    />
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => deleteQuestion(index)}
                                    />
                                    <Button
                                        type="text"
                                        icon={<UpOutlined />}
                                        onClick={() => moveQuestion(index, -1)}
                                        disabled={index === 0}
                                    />
                                    <Button
                                        type="text"
                                        icon={<DownOutlined />}
                                        onClick={() => moveQuestion(index, 1)}
                                        disabled={index === answers.length - 1}
                                    />
                                </div>
                            ))}
                            <LmsButton buttonText={"Добавить ответ"} handleClick={addQuestion} />
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