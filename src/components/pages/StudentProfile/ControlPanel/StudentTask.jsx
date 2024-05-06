import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";



import axios from "axios";
import Badge from "react-bootstrap/Badge";
import { apiUrl } from "../../../../shared/config";

function StudentIncomingTask() {
    const [upcomingTaskData, setUpcomingTaskData] = useState([]);
    const [statusTaskData, setStatusTaskData] = useState("");
    const studentId = localStorage.getItem("studentId");
    useEffect(() => {
        axios
            .get(
                apiUrl + "get-student-upcoming-task/" + studentId,
                // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((response) => {
                setUpcomingTaskData(response.data);
                console.log(response.data);
            });
    }, []);
    const markIsDone = (task_id, title, detail, teacher, student) => {
        try {
            axios
                .put(
                    apiUrl + "update-task/" + task_id,
                    {
                        complete_status: true,
                        title: title,
                        detail: detail,
                        teacher: teacher,
                        student: student,
                    },
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    { headers: { "Content-Type": "multipart/form-data" } }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        //   setStatusTaskData('success')

                        window.location.reload();
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div>
                <div>Мои входящие задачи</div>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Детали</th>
                                <th>Создатель</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingTaskData.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.title}</td>
                                    <td>{task.detail}</td>
                                    <td>
                                        <Link
                                            to={`/teacher-detail/${task.teacher.id}`}
                                        >
                                            {task.teacher.full_name}
                                        </Link>{" "}
                                    </td>
                                    <td>
                                        {task.complete_status === false && (
                                            <Button
                                                onClick={() =>
                                                    markIsDone(
                                                        task.id,
                                                        task.title,
                                                        task.detail,
                                                        task.teacher.id,
                                                        task.student.id
                                                    )
                                                }
                                                variant="danger"
                                            >
                                                Пометить как выполненное
                                            </Button>
                                        )}
                                        {task.complete_status === true && (
                                            <Badge bg="secondary">
                                                Выполнено
                                            </Badge>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
export default StudentIncomingTask;
