import React, { useEffect } from "react";
import useLessonData from "./useLessonData";
import parse from 'html-react-parser';
import hljs from 'highlight.js';  // Import highlight.js
import 'highlight.js/styles/default.css';  // Import default highlight.js styles
import "./LessonsStyle.scss";
import LmsButton from "@/components/reUseComponents/Button";

function LearningClassicLesson({ selectedStage, onComplete }) {
    const { stageData, showClassicLesson } = useLessonData(selectedStage ? selectedStage.id : null);

    useEffect(() => {
        // Highlight all code blocks on component mount/update
        hljs.highlightAll();
    }, [stageData]);

    return (
        <>
            {showClassicLesson && stageData && (
                <div className={`study-content__${selectedStage.type}-lesson`}>
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