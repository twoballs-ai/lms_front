import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Figure from "react-bootstrap/Figure";
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
    let stagePk = props.selectedStage.id
    const location = useLocation();
    const navigate = useNavigate();

    console.log(props)
    useEffect(() => {
        const fetchData = () => {
            axios
                .get(
                    `${apiLmsUrl}stage/${stagePk}`
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // { headers: { "Content-Type": "multipart/form-data" } }
                ).then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        console.log(response.data)
                        if (response.data.items && Object.keys(response.data.items).length > 0) {
                            setStageEditorData(response.data.items.text);
                        }

                        // // console.log(moduleData[stage_id] && moduleData[stage_id]["id"]);
                        // setStagePkData(
                        //     response.data[parseInt(stage_id) - 1] &&
                        //         response.data[parseInt(stage_id) - 1]["id"]
                        // );
                    }
                });
        };
        fetchData();
    }, [stagePk]);
    const formSubmit = async (e) => {

        e.preventDefault();
        const data = {
            text: valueEditor
        };
        try {
            axios
                .post(
                    `${apiLmsUrl}stage/${stagePk}/classic_lesson/`,
                    data,
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    console.log(response.data.modules);
                    if (response.status === 200) {

                        console.log(response.data)
                    }
                    // window.location.href='/teacher-profile/my-courses'
                    // Handle response
                });
        } catch (error) {

        }
    };

    return (
        <div>

            <div>
                <div>
                    Вы находитесь на этапе добавления классического урока с видео, фото, текстом
                </div>
                <div>
                    <div className="App">

                        <Editor data={stageEditorData} onChange={handleChange} />

                    </div>
                    <LmsButton buttonText={"сохранить"} handleClick={formSubmit} />
                </div>
            </div>

        </div>
    );
}

export default AddingClassicLesson