import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Editor from "../../../../../Editor";
import { apiLmsUrl, apiUrl, typesApiUrl } from "../../../../../../shared/config";
import CourseEditorService from "../../../../../../services/course.editor.service";
import LmsButton from "../../../../../reUseComponents/Button";
import TextInput from "../../../../../reUseComponents/TextInput";
import "./LessonsStyle.scss"
function AddingClassicLesson(props) {
    const [inputTitleValue, setInputTitleValue] = useState('');

    const handleInputChange = (e) => {
        setInputTitleValue(e.target.value);
    };



    const handleChange = (stageEditorData) => {
        setStageEditorData(stageEditorData)
    }


    const [stageEditorData, setStageEditorData] = useState('')
    const [showClassicLesson, setShowClassicLesson] = useState(false)
    let stagePk = props.selectedStage ? props.selectedStage.id : null;


    useEffect(() => {
        if (stagePk) {
            setStageEditorData('')
            const fetchData = async () => {
                await CourseEditorService.editCoursePageGetClassicLesson(stagePk).then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        if (response.data.lesson.html_code_text) {
                            setStageEditorData(response.data.lesson.html_code_text);
                            setInputTitleValue(response.data.title)
                            setShowClassicLesson(true);
                        } else {
                            setInputTitleValue("")
                            setStageEditorData("");
                            setShowClassicLesson(true);
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
            stage_id:stagePk,
            html_code_text: stageEditorData,
            title:inputTitleValue
        };

        const response = await CourseEditorService.editCoursePageUpdateClassicLesson(data)
        if (response.status === 200 || response.status === 201) {
            // console.log(response.data.data.lesson.html_code_text)
            setStageEditorData(response.data.data.lesson.html_code_text);
            setInputTitleValue(response.data.data.title)

        }
    };
    return (
        <>            
        {(showClassicLesson) && (
                   <div className={`content__${props.selectedStage.type}-lesson`}>
            <div className={`${props.selectedStage.type}-lesson__title`}>
                <p>Классический этап с видео, фото, текстом</p>

            </div>
            <div className={`${props.selectedStage.type}-lesson__add-block`}>
                <p>Название этапа:</p>
                <TextInput isTextArea={false} placeholder={"Напишите сюда название этапа"} value={inputTitleValue} onChange={handleInputChange} />

                <div className="add-block__editor">
                    <Editor data={stageEditorData} onChange={handleChange} />
                </div>
                <div className="add-block__button"><LmsButton buttonText={"сохранить"} handleClick={formSubmit} /></div>
                
            </div>

        </div>


        )}
        
        </>

    );
}

export default AddingClassicLesson