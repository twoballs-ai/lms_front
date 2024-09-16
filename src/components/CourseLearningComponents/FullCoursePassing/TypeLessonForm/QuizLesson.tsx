import React, { useState, useEffect, useCallback } from "react";
import useLessonData from "./useLessonData";
import "./LessonsStyle.scss";
import StudentService from "@/services/student.service";
import LmsButton from "@/components/reUseComponents/Button";

function LearningQuizLesson({ selectedStage, onComplete }) {
    const { stageData, showQuizLesson } = useLessonData(selectedStage ? selectedStage.id : null);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);

    // Define shuffleAndSetAnswers with useCallback
    const shuffleAndSetAnswers = useCallback((answers) => {
        const shuffled = shuffleArray(answers);
        setShuffledAnswers(shuffled);
    }, []);

    useEffect(() => {
        if (stageData && stageData.lesson && stageData.lesson.answers) {
            shuffleAndSetAnswers(stageData.lesson.answers);
            setSelectedAnswers([]);  // Reset selected answers when stageData changes
            setSelectedRadioAnswer(null); // Reset selected radio answer when stageData changes
        }
    }, [stageData, shuffleAndSetAnswers]);

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleCheckQuiz = async () => {
        const answersToCheck = stageData.lesson.quiz_type === "radio" ? [selectedRadioAnswer] : selectedAnswers;
        try {
            const response = await StudentService.checkQuizLesson(selectedStage.id, answersToCheck);
            if (response.status === 200 || response.status === 201) {
                if (response.data.status === false) {
                    setIsChecked(false);
                    setIsCorrect(false);
                    setSelectedAnswers([]);
                    setSelectedRadioAnswer(null);
                    shuffleAndSetAnswers(stageData.lesson.answers);  // Shuffle answers again on incorrect answer
                } else {
                    setIsChecked(true);
                    setIsCorrect(true);
                }
            }
        } catch (error) {
            console.error("Failed to check quiz answers", error);
        }
    };

    const handleAnswerChange = (answerId, isChecked) => {
        if (stageData.lesson.quiz_type === "radio") {
            setSelectedRadioAnswer(answerId);
        } else {
            setSelectedAnswers((prevAnswers) => {
                if (isChecked) {
                    return [...prevAnswers, answerId];
                } else {
                    return prevAnswers.filter((id) => id !== answerId);
                }
            });
        }
    };

    return (
        <>
            {showQuizLesson && stageData && (
                <div className={`content__${selectedStage.type}-lesson`}>
                    <div className={`${selectedStage.type}-lesson__title`}>
                        <p>Квиз: {stageData.title}</p>
                    </div>
                    <div className={`${selectedStage.type}-lesson__add-block`}>
                        <p>Вопрос: {stageData.lesson.question}</p>
                        <div>
                            <p>Выберите правильный ответ:</p>
                            {shuffledAnswers.map((answer) => (
                                <div key={answer.id} className="question-item">
                                    <input
                                        type={stageData.lesson.quiz_type === "radio" ? "radio" : "checkbox"}
                                        name="quizAnswer"
                                        checked={
                                            stageData.lesson.quiz_type === "radio"
                                                ? selectedRadioAnswer === answer.id
                                                : selectedAnswers.includes(answer.id)
                                        }
                                        onChange={(e) => handleAnswerChange(answer.id, e.target.checked)}
                                    />
                                    <span>{answer.answer_text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {!isCorrect && (
                        <div className="error-message">
                            <p>Ответ неправильный. Попробуйте снова.</p>
                        </div>
                    )}
                    {!isChecked && (
                        <div className="content__quiz-buttons">
                            <LmsButton buttonText={"Проверить"} handleClick={handleCheckQuiz} />
                        </div>
                    )}
                    {isChecked && (
                        <div className="content__learn-buttons">
                            <LmsButton buttonText={"Следующий этап"} handleClick={onComplete} />
                        </div>
                    )}

                </div>
            )}
        </>
    );
}

export default LearningQuizLesson;
