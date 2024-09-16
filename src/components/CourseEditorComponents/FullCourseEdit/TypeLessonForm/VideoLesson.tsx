import React, { useState, useEffect } from "react";
import LmsButton from "@/components/reUseComponents/Button";
import CourseEditorService from "@/services/course.editor.service";
import TextInput from "@/components/reUseComponents/TextInput";
import VideoLinkForm from "@/components/reUseComponents/VideoLinkForm"; // Update to VideoLinkForm

function AddingVideoLesson(props) {
    const [inputTitleValue, setInputTitleValue] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [showVideoLesson, setShowVideoLesson] = useState(false);
    const stagePk = props.selectedStage ? props.selectedStage.id : null;

    useEffect(() => {
        if (stagePk) {
            const fetchData = async () => {
                const response = await CourseEditorService.editCoursePageGetLesson(stagePk);
                if (response.status === 200 || response.status === 201) {
                    if (response.data.lesson) {
                        setVideoUrl(response.data.lesson.video_link);
                        setInputTitleValue(response.data.title);
                        setShowVideoLesson(true);
                    } else {
                        setInputTitleValue("");
                        setVideoUrl("");
                        setShowVideoLesson(true);
                    }
                }
            };
            fetchData();
        }
    }, [props, stagePk]);

    const handleInputChange = (e) => {
        setInputTitleValue(e.target.value);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {
            stage_id: stagePk,
            video_link: videoUrl,
            title: inputTitleValue
        };

        const response = await CourseEditorService.editCoursePageUpdateVideoLesson(data);
        if (response.status === 200 || response.status === 201) {
            setVideoUrl(response.data.data.lesson.video_link);
            setInputTitleValue(response.data.data.title);
        }
    };

    return (
        <>
            {showVideoLesson && (
                <div className={`content__${props.selectedStage.type}-lesson`}>
                    <div className={`${props.selectedStage.type}-lesson__title`}>
                        <p>Видео урок</p>
                    </div>
                    <div className={`${props.selectedStage.type}-lesson__add-block`}>
                        <p>Название урока:</p>
                        <TextInput
                            isTextArea={false}
                            placeholder={"Напишите сюда название этапа"}
                            value={inputTitleValue}
                            onChange={handleInputChange}
                        />
                        <p>Пока поддерживается только ютуб и рутуб</p>
                        <div className="add-block__editor">
                            <VideoLinkForm videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
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

export default AddingVideoLesson;
