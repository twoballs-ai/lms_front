import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const baseUrl = 'http://127.0.0.1:8000/api/'
function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState([])
  const studentId = localStorage.getItem('studentId')

  useEffect(() => {
    try{
      axios
      .get(baseUrl + 'student/dashboard/' +studentId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setDashboardData(response.data)
        console.log(response.data)
      })
    } catch(e){
      console.log(e)
    }

  }, [])

  return (
    <>
    <div className="row">
      <div className="col-4"><Card border="primary" style={{ width: '18rem' }}>
      <Card.Header>Мои курсы</Card.Header>
        <Card.Body>
          <Card.Text>
          
         <Link to="my-courses">{dashboardData.total_student_enroll_courses}</Link> 
          </Card.Text>
        </Card.Body>
      </Card></div>
      <div className="col-4"><Card border="success" style={{ width: '18rem' }}>
        <Card.Header>Избранных курсов</Card.Header>
        <Card.Body>
          
          <Card.Text>
          <Link to="favorite-courses">{dashboardData.total_favorite_courses}</Link>
          </Card.Text>
        </Card.Body>
      </Card></div>
      <div className="col-4">     
      <Card border="info" style={{ width: '18rem' }}>
        <Card.Header>Текущих задач</Card.Header>
        <Card.Body>
         
          <Card.Text>
            <small>
            Выполнено: {dashboardData.total_completed_tasks}, Не выполнено: {dashboardData.total_pending_tasks}
            </small> 

          </Card.Text>
        </Card.Body>
      </Card></div>
    </div>
      

    </>
  )

}

export default StudentDashboard
