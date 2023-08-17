import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";
import { apiUrl } from "../../../../shared/config";
// import Swal from 'sweetalert2'

function ViewTask() {
    const [taskData, setTaskData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const { course_id } = useParams();
    const teacherId = localStorage.getItem("teacherId");
    // console.log(teacherId)
    useEffect(() => {
        axios
            .get(
                apiUrl + "student-task/" + teacherId
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                // ,{headers: { "Content-Type": "multipart/form-data" }}
            )
            .then((response) => {
                setTaskData(response.data);
                setTotalResult(response.data.length);
                console.log(response.data);
            });
    }, [totalResult]);
    const Swal = require("sweetalert2");

    return (
        <>
            <Card>
                <Card.Header>
                    Все задачи курса ({totalResult}){" "}
                    <Button
                        className="float-end"
                        as={Link}
                        to={`/teacher-profile/add-tasks/${course_id}/`}
                    >
                        Добавить задачу
                    </Button>{" "}
                </Card.Header>
                <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Статус выполнения</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskData.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.title}</td>
                                    {task.complete_status === false && (
                                        <Badge bg="warning">Выполняется</Badge>
                                    )}
                                    {task.complete_status === true && (
                                        <Badge bg="success">Выполнено</Badge>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}
export default ViewTask;
