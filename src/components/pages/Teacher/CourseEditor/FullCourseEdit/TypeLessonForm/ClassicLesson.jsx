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
import { apiUrl, typesApiUrl } from "../../../../../../shared/config";
import CourseEditorService from "../../../../../../services/course.editor.service";
function AddingClassicLesson(props) {
    // const [valueEditor, setValueEditor] = useState('')
    // const handleChange = (valueEditor) => {
    //     setValueEditor(valueEditor)
    // }

    // let stagePk = props.data
    // const location = useLocation();
    // const navigate = useNavigate();

    // const formSubmit = async (e) => {
    //     e.preventDefault();
    //     const data = {
    //         stage: stagePk,
    //         is_classic: true,
    //         content: valueEditor
    //     };
    //     await CourseEditorService.editCoursePageAddClassicLesson(stagePk,data).then((response) => {
    //         if (response.status === 200 || response.status === 201) {
    //             navigate(-2);
    //         }
    //     });
    // };

    return (
        <div>
        
            <Card className="mt-3 mx-3">
                    <Card.Header>
                        Вы находитесь на этапе добавления классического урока с видео, фото, текстом
                    </Card.Header>
                    <Card.Body>
                        <div className="App">

                            <Editor onChange={"handleChange"} />

                        </div>

                        <Button
                            onClick={"formSubmit"}
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

export default AddingClassicLesson