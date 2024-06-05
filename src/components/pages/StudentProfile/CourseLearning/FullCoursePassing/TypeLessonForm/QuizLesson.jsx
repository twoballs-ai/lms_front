import React from "react";
import useLessonData from "./useLessonData";
import "./LessonsStyle.scss";

function LearningQuizLesson({ selectedStage }) {
    const { stageData, showQuizLesson } = useLessonData(selectedStage ? selectedStage.id : null);

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
                            <p>Ответы:</p>
                            {stageData.lesson.answers.map((answer, index) => (
                                <div key={index} className="question-item">
                                    <input
                                        type={stageData.lesson.quiz_type === 'radio' ? 'radio' : 'checkbox'}
                                        checked={answer.is_true_answer}
                                        readOnly
                                    />
                                    <span>{answer.answer_text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LearningQuizLesson;