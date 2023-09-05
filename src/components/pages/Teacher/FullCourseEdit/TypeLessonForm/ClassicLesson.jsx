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
import Editor from "../../../../Editor";
import { apiUrl, typesApiUrl } from "../../../../../shared/config";
function AddingClassicLesson(props) {
    const [valueEditor, setValueEditor] = useState('')
    const handleChange = (valueEditor) => {
        setValueEditor(valueEditor)
        console.log(valueEditor)
    }

    let stagePk = props.stagePk
    const location = useLocation();
    const navigate = useNavigate();



    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                typesApiUrl + "classic-lesson/" + stagePk,
                {
                    stage: stagePk,
                    is_classic: true,
                    content: JSON.stringify(valueEditor)

                },
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                navigate(-2);
            });
    };

    return (
        <div>
            {location.state.type === "classicLesson" && (

                <Card>
                    <Card.Header>
                        Добавление классического урока
                    </Card.Header>
                    <Card.Body>
                        <div className="App">

                            <Editor onChange={handleChange} />

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
            )}
        </div>
    );
}

export default AddingClassicLesson