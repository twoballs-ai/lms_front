import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import axios from "axios";

import { apiUserUrl } from "../../../../../shared/config";
// import authHeader from '../../../../services/auth-header'
import TeacherService from '../../../../../services/teacher.service'
function Dashboard() {
    const [dashboardData, setDashboardData] = useState([]);
    // const teacherId = localStorage.getItem("user");
    useEffect(() => {
        document.title = 'Профиль учителя - dashboard - coursero.ru';
      }, []);

    return (
        <>
        <p>Dashboard в разработке</p>
            {/* <div className="row">
                <div className="col-4">
                    <div border="primary" style={{ width: "18rem" }}>
                        <div>Всего курсов</div>
                        <div>
                            <div>
                                {dashboardData.total_teacher_courses}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div border="success" style={{ width: "18rem" }}>
                        <div>Всего студентов</div>
                        <div>
                            <div>
                                {dashboardData.total_teacher_students}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div border="info" style={{ width: "18rem" }}>
                        <div>Создано глав</div>
                        <div>
                            <div>
                                {dashboardData.total_teacher_chapters}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Dashboard;
