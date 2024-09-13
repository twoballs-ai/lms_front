import React from "react";
import useLessonData from "./useLessonData";
import "./LessonsStyle.scss";
import ReactPlayer from 'react-player';
import LmsButton from "@/components/reUseComponents/Button";

function LearningVideoLesson({ selectedStage, onComplete }) {
    const { stageData, showVideoLesson } = useLessonData(selectedStage ? selectedStage.id : null);

    const isRutubeVideo = (url) => {
        return url.includes("rutube.ru");
    };

    const embedVideoUrl = (videoUrl) => {
        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
            const videoId = videoUrl.split('v=')[1] || videoUrl.split('/')[3];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (isRutubeVideo(videoUrl)) {
            const videoId = videoUrl.split('video/')[1];
            return `https://rutube.ru/play/embed/${videoId}`;
        }
        return videoUrl;
    };

    return (
        <>
            {showVideoLesson && stageData && (
                <div className={`study-content__${selectedStage.type}-lesson`}>
                    <div className={`${selectedStage.type}-lesson__title`}>
                        <p>Урок: {stageData.title}</p>
                    </div>
                    <div className={`${selectedStage.type}-lesson__add-block`}>
                        {isRutubeVideo(stageData.lesson.video_link) ? (
                            <iframe
                                width="560"
                                height="315"
                                src={embedVideoUrl(stageData.lesson.video_link)}
                                title="Video preview"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <ReactPlayer
                                url={stageData.lesson.video_link}
                                controls={true}
                                width="560px"
                                height="315px"
                            />
                        )}
                    </div>
                    <div className="content__learn-buttons">
                        <LmsButton buttonText={"Следующий этап"} handleClick={onComplete} />
                    </div>
                </div>
            )}
        </>
    );
}

export default LearningVideoLesson;
