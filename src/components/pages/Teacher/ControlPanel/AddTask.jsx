import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { apiUrl } from "../../../../shared/config";

function AddTask() {
    // const teacherId= localStorage.getItem('teacherId')
    const [taskAddData, setTaskAddData] = useState({
        detail: "",
        title: "",
    });
    //   const [listStudents, setListStudents]= useState([])
    const [studentData, setStudentData] = useState([]);
    let { course_id } = useParams();
    const teacherId = localStorage.getItem("teacherId");
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "enrolled-students/" + course_id
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setStudentData(response.data);
                console.log(response.data);
            });
    }, []);
    console.log(studentData);

    const handleChange = (event) => {
        setTaskAddData({
            ...taskAddData,
            [event.target.name]: event.target.value,
        });
        // console.log(taskAddData)
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const responses = [];

        for (let i = 0; i < studentData.length; i++) {
            responses.push(
                await axios.post(
                    apiUrl + "student-task/" + teacherId,
                    {
                        teacher: teacherId,
                        title: taskAddData.title,
                        detail: taskAddData.detail,
                        student: studentData[i].student.id,
                    },
                    { headers: { "Content-Type": "multipart/form-data" } }
                    // { params: {
                    //     fileID: studentData.fileID,
                    //     deletedBy: studentData.deletedBy
                    // }}
                )
            );
        }

        Promise.all(responses)
            .then(async (response) => {
                const responsesnotif = [];
                for (let i = 0; i < studentData.length; i++) {
                    responsesnotif.push(
                        await axios.post(
                            apiUrl + "teacher/save-notify",
                            {
                                teacher: teacherId,
                                notification_for: "student",
                                notification_subject: "task",
                                student: studentData[i].student.id,
                            },
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                            // { params: {
                            //     fileID: studentData.fileID,
                            //     deletedBy: studentData.deletedBy
                            // }}
                        )
                    );
                }
                Promise.all(responsesnotif).then(async (response) => {
                    console.log("true");
                });
                window.location.reload();
            })
            .catch((err) => console.error(err));
    };
    return (
        <>
            <Card>
                <Card.Header>Добавление главы</Card.Header>
                <Card.Body>
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
                                name="detail"
                                as="textarea"
                                rows={3}
                                placeholder="Описание"
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
                </Card.Body>
            </Card>
        </>
    );
}
export default AddTask;
