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
import Editor from "../../../../../../Editor";
import { apiUrl, typesApiUrl } from "../../../../../../../shared/config";
import CourseEditorService from "../../../../../../../services/course.editor.service";
function EditClassicLesson(props) {
    const [valueEditor, setValueEditor] = useState('')
    const handleChange2 = (valueEditor) => {
        setValueEditor(valueEditor)
    }

    let stage_id = props.contentData.stage
    let contentData = props.contentData.content
    const location = useLocation();
    const navigate = useNavigate();
 
    console.log(props)


    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {
            stage: stage_id,
            is_classic: true,
            content: valueEditor
        };
        await CourseEditorService.editCoursePagePutClassicLesson(props.contentData.id,data).then((response) => {
            if (response.status === 200 || response.status === 201) {
                window.location.reload();
            }
        });
    };

    return (
        <div>
            <Card className="mt-3 mx-3">
                    <Card.Header>
                    Вы находитесь на этапе редактирования классического урока с видео, фото, текстом
                    </Card.Header>
                    <Card.Body>
                    <div className="App">

<Editor onChange={handleChange2} data ={contentData} />

    </div>
                   
                            <Button
                                onClick={formSubmit}
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                   
                    </Card.Body>
                </Card>

        </div>
    );
}

export default EditClassicLesson