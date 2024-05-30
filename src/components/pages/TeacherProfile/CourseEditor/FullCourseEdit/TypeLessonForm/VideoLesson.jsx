import React, { useState, useEffect } from "react";

import LmsButton from "../../../../../reUseComponents/Button";
import CourseEditorService from "../../../../../../services/course.editor.service";
import TextInput from "../../../../../reUseComponents/TextInput";

function AddingVideoLesson(props) {

    const [inputTitleValue, setInputTitleValue] = useState('');

    const handleInputChange = (e) => {
        setInputTitleValue(e.target.value);
    };

    const [showVideoLesson, setShowVideoLesson] = useState(false)
    let stagePk = props.selectedStage ? props.selectedStage.id : null;





    useEffect(() => {
        if (stagePk) {
   
            const fetchData = async () => {
                await CourseEditorService.editCoursePageGetLesson(stagePk).then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        if (response.data.lesson.video_link) {
                            // setStageEditorData(response.data.lesson.html_code_text);
                            setInputTitleValue(response.data.title)
                            setShowVideoLesson(true);
                        } else {
                            setInputTitleValue("")
                            // setStageEditorData("");
                            setShowVideoLesson(true);
                        }
                    }
                });
            };
            fetchData();
        }
    }, [props, stagePk]);



    const [videoLessonData, setVideoLessonData] = useState({
        is_video: true,
        video_lesson: "",
        stage: "",
    });

    const handleChange = (event) => {
        setVideoLessonData({
            ...videoLessonData,
            [event.target.name]: event.target.value,
        });
        console.log(videoLessonData);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append("stage", stagePk);
        _formData.append("is_video", videoLessonData.is_video);
        _formData.append("video_lesson", videoLessonData.video_lesson);

        await CourseEditorService.editCoursePageAddVideoLesson(stagePk, _formData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                navigate(-2);
            }
        });
    };
    console.log(props)
    return (
        <>        
        {(showVideoLesson) && (
            <div className={`content__${props.selectedStage.type}-lesson`}>
                <div className={`${props.selectedStage.type}-lesson__title`}>
                    <p>Видео урок</p>

                </div>
                <div className={`${props.selectedStage.type}-lesson__add-block`}>
                    <p>Название этапа:</p>
                    <TextInput isTextArea={false} placeholder={"Напишите сюда название этапа"} value={inputTitleValue} onChange={handleInputChange} />

                    <div className="add-block__editor">
               
                    </div>
                    <div className="add-block__button"><LmsButton buttonText={"сохранить"} handleClick={formSubmit} /></div>

                </div>

            </div>


        )}
        </>
    );
}

export default AddingVideoLesson;