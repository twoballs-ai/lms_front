import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

import axios from "axios";


// import { apiUrl } from "../../../../shared/config";

function CoursePageInfo() {
  const [dashboardData, setDashboardData] = useState([]);
  //   const teacherId = localStorage.getItem('teacherId')

  useEffect(() => {
    // try{
    //   axios
    //   .get(apiUrl + 'teacher/dashboard/' +teacherId
    //     // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
    //     // ,{headers: { "Content-Type": "multipart/form-data" }}
    //   )
    //   .then(response => {
    //     setDashboardData(response.data)
    //     console.log(response.data)
    //   })
    // } catch(e){
    //   console.log(e)
    // }
  }, []);

  return (
    <>
      <p>Вы посетили страницу прохождения</p>
      {/* <div className="row">
      <div className="col-4"><div border="primary" style={{ width: '18rem' }}>
      <div>Всего курсов</div>
        <div>
          <div>
          
          {dashboardData.total_teacher_courses}
          </div>
        </div>
      </div></div>
      <div className="col-4"><div border="success" style={{ width: '18rem' }}>
        <div>Всего студентов</div>
        <div>
          
          <div>
          {dashboardData.total_teacher_students}
          </div>
        </div>
      </div></div>
      <div className="col-4">     
      <div border="info" style={{ width: '18rem' }}>
        <div>Создано глав</div>
        <div>
         
          <div>
          {dashboardData.total_teacher_chapters}
          </div>
        </div>
      </div></div>
    </div> */}
    </>
  );
}

export default CoursePageInfo;
