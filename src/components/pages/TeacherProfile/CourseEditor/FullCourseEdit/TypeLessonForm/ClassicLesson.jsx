import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Editor from "../../../../../Editor";
import { apiLmsUrl, apiUrl, typesApiUrl } from "../../../../../../shared/config";
import CourseEditorService from "../../../../../../services/course.editor.service";
import LmsButton from "../../../../../reUseComponents/Button";
function AddingClassicLesson(props) {

    const [valueEditor, setValueEditor] = useState('')
    const handleChange = (valueEditor) => {
        setValueEditor(valueEditor)
    }


    const [stageEditorData, setStageEditorData] = useState('')
    const [showClassicLesson, setShowClassicLesson] = useState(false)
    let stagePk = props.selectedStage ? props.selectedStage.id : null;
    // console.log(stagePk)

    const setModuleData = props.setModuleData


    console.log(stageEditorData)
    useEffect(() => {
        if (stagePk) {
            const fetchData = async () => {
                await CourseEditorService.editCoursePageGetClassicLesson(stagePk).then((response) => {
                    console.log(response.data)
                    if (response.status === 200 || response.status === 201) {
                        if (response.data.items && Object.keys(response.data.items).length > 0) {
                            setStageEditorData(response.data.items.html_code_text);
                            setShowClassicLesson(true);
                        } else {
                            // console.log("dddd")
                            setStageEditorData("");
                            setShowClassicLesson(true);
                        }
                    }
                });
            };
            fetchData();
        }
    }, [props]);
    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {

            html_code_text: valueEditor
        };

        const response = await CourseEditorService.editCoursePageAddClassicLesson(stagePk, data)
        if (response.status === 200 || response.status === 201) {
            setModuleData(prevModuleData => {
                const updatedModuleData = [...prevModuleData];
                // Находим нужный этап в moduleData и обновляем его данные
                const updatedStageIndex = updatedModuleData.findIndex(stage => stage.id === stagePk);
                if (updatedStageIndex !== -1) {
                    updatedModuleData[updatedStageIndex] = {
                        ...updatedModuleData[updatedStageIndex],
                        items: {
                            id: response.data.items.id,
                            text: response.data.items.text,
                            type: response.data.items.type,
                            stage_id: response.data.items.stage_id
                        }
                    };
                }
                return updatedModuleData;
            });
        }
    };
    // console.log(showClassicLesson)
    return (
        <div>
            {(showClassicLesson) && (
                <div>
                    <div>
                        Классический этап с видео, фото, текстом
                    </div>
                    <div>
                        <div className="App">
                            <Editor data={stageEditorData} onChange={handleChange} />
                        </div>
                        <LmsButton buttonText={"сохранить"} handleClick={formSubmit} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddingClassicLesson