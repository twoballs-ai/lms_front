import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import { apiUrl } from "../../../../shared/config";

function AddStudyMaterial() {
    // const teacherId= localStorage.getItem('teacherId')
    const { course_id } = useParams();
    const [studyMaterialAddData, setStudyMaterialAddData] = useState({
        course: course_id,
        title: "",
        description: "",
        upload: "",
        comment: "",
    });

    const handleChange = (event) => {
        setStudyMaterialAddData({
            ...studyMaterialAddData,
            [event.target.name]: event.target.value,
        });
        console.log(studyMaterialAddData);
    };

    const handleFileChange = (event) => {
        setStudyMaterialAddData({
            ...studyMaterialAddData,
            [event.target.name]: event.target.files[0],
        });
    };
    const formSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                apiUrl + "study-materials/" + course_id,
                studyMaterialAddData,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                if (response.status === 200 || response.status === 201) {

                    window.location.reload();
                }

                // window.location.href='/teacher-profile/my-courses'
            });
    };
    return (
        <>
            <div>
                <div>Добавление материала</div>
                <div>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="категория"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                placeholder="Описание"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Загрузки</Form.Label>
                            <Form.Control
                                name="upload"
                                type="file"
                                placeholder="upload"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCategory"
                        >
                            <Form.Label>Комментарии автора</Form.Label>
                            <Form.Control
                                name="comment"
                                as="textarea"
                                rows={3}
                                placeholder="Комментарии автора"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button
                            onClick={formSubmit}
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}
export default AddStudyMaterial;
