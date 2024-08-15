import React from "react";
import useLessonData from "./useLessonData";
import parse from 'html-react-parser';
import "./LessonsStyle.scss";
import LmsButton from "../../../../../reUseComponents/Button";

function LearningClassicLesson({ selectedStage, onComplete }) {
    const { stageData, showClassicLesson } = useLessonData(selectedStage ? selectedStage.id : null);
    console.log(stageData)
    return (
        <>
            {showClassicLesson && stageData && (
                <div className={`content__${selectedStage.type}-lesson`}>
                    <div className={`${selectedStage.type}-lesson__title`}>
                        <p>Урок: {stageData.title}</p>
                    </div>
                    <div className={`${selectedStage.type}-lesson__add-block`}>
                        {parse(stageData.lesson?.html_code_text)}
                    </div>
                    <div className="content__learn-buttons">
                            <LmsButton buttonText={"Следующий этап"} handleClick={onComplete} />
                        </div>
                </div>
            )}
        </>
    );
}

export default LearningClassicLesson;