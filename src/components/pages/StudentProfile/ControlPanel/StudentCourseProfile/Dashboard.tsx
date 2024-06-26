import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";




import axios from "axios";
import { apiUrl } from "../../../../../shared/config";

function StudentDashboard() {
    const [dashboardData, setDashboardData] = useState([]);
    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        try {
            axios
                .get(
                    apiUrl + "student/dashboard/" + studentId
                    // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
                    // ,{headers: { "Content-Type": "multipart/form-data" }}
                )
                .then((response) => {
                    setDashboardData(response.data);
                    console.log(response.data);
                });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <>
            <div className="row">
                <span>Общее количество баллов за прохождение курсов: {dashboardData.total_student_score}</span>
                <span>Общее количество энергии: {dashboardData.total_student_energy}</span>
                <div className="col-4">
                    <div border="primary" style={{ width: "18rem" }}>
                        <div>Мои курсы</div>
                        <div>
                            <div>
                                <Link to="my-courses">
                                    {dashboardData.total_student_enroll_courses}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div border="success" style={{ width: "18rem" }}>
                        <div>Избранных курсов</div>
                        <div>
                            <div>
                                <Link to="favorite-courses">
                                    {dashboardData.total_favorite_courses}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div border="info" style={{ width: "18rem" }}>
                        <div>Текущих задач</div>
                        <div>
                            <div>
                                <small>
                                    Выполнено:{" "}
                                    {dashboardData.total_completed_tasks}, Не
                                    выполнено:{" "}
                                    {dashboardData.total_pending_tasks}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentDashboard;
