import React from "react";
import useLessonData from "./useLessonData";
import "./LessonsStyle.scss";
import ReactPlayer from 'react-player';
function LearningVideoLesson({ selectedStage }) {
    const { stageData, showVideoLesson } = useLessonData(selectedStage ? selectedStage.id : null);

    return (
        <>
            {showVideoLesson && stageData && (
                <div className={`content__${selectedStage.type}-lesson`}>
                    <div className={`${selectedStage.type}-lesson__title`}>
                        <p>Урок: {stageData.title}</p>
                    </div>
                    <div className={`${selectedStage.type}-lesson__add-block`}>
                        <ReactPlayer
                            url={stageData.lesson.video_link}
                            controls={true}
                            width="560px"
                            height="315px"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default LearningVideoLesson;