import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function StudentMyCourses() {
  const [courseData, setCourseData] = useState([])
  const studentId = localStorage.getItem('studentId')
  useEffect(() => {
    axios
      .get(baseUrl + 'get-student-courses/' +studentId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setCourseData(response.data)
        console.log(response.data)
      })
  }, [])
    return(
        <>
        <Card>
        <Card.Header>Мои курсы</Card.Header>
       <Card.Body>
       <Table striped bordered hover>
      <thead>
        <tr>
    
          <th>Название курса</th>
          <th>Создатель</th>
        </tr>
      </thead>
      <tbody>
      {courseData.map((courses, index) =>
        <tr key={index}>
          <td><Link to= {`/detail/${courses.course.id}`}>{courses.course.title}</Link></td>
          <td><Link to={`/teacher-detail/${courses.course.teacher.id}`}>{courses.course.teacher.full_name}</Link> </td>
          <td><Button as={Link} to={'/student-profile/study-materials/' + courses.course.id} variant="success">Учебный<br/> материал</Button></td>

        </tr>
 )}
      </tbody>
    </Table>
      </Card.Body>
    </Card>
        </>
    )
}
export default StudentMyCourses