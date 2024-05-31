import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiLmsUrl } from "../../../../../../shared/config";
import LmsButton from "../../../../../reUseComponents/Button";

function AddingVideoLesson(props) {

    const [showVideoLesson, setShowVideoLesson] = useState(false)
    let stagePk = props.selectedStage.id
    let addVideolesson = props.addVideolesson
    const setModuleData = props.setModuleData

    const location = useLocation();
    const navigate = useNavigate();
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
        <div>
            {(showVideoLesson || addVideolesson) && (
                <div>
                    <div>
                        Классический видеоурок
                    </div>

                    <form>
                        <div className="" controlId="formBasicCategory">
                            <label>Добавление ссылки на видео</label>
                            <input
                                name="video_lesson"
                                type="text"
                                placeholder="Добавление ссылки"
                                onChange={handleChange}
                            />
                        </div>
                        <LmsButton buttonText={"Добавить видеоурок"} handleClick={formSubmit} />
                    </form>



                </div>
            )}

        </div>
    );
}

export default AddingVideoLesson;