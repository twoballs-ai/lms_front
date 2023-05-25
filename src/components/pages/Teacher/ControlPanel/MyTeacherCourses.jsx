import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function MyTeacherCourses() {
  const [courseData, setCourseData]= useState([])
  const teacherId= localStorage.getItem('teacherId')
// console.log(teacherId)
  useEffect(()=>{
    axios
    .get(baseUrl+'teacher-courses/'+teacherId
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
      setCourseData(response.data)
      console.log(response.data)
    })
  },[])
console.log(courseData)
    return(
        <>
        <Card>
        <Card.Header>Мои курсы</Card.Header>
       <Card.Body>
       <Table striped bordered hover>
      <thead>
        <tr>
    
          <th>Название курса</th>
          <th>Обложка</th>
          <th>Создатель</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {courseData.map((course,index)=>
        <tr key={index}>
          <td><Link to='/teacher-profile/all-chapters/2/'>{course.title}</Link></td>
          <td><img src={course.course_image} width="80" className="rounded float-start" alt={course.title}/></td>
          <td><Link to='/teacher-profile'>{course.teacher}</Link> </td>
          <td> <Button variant="danger">Удалить курс</Button>{' '}<Button as={Link} to={'/teacher-profile/add-chapter/'+ course.id} variant="primary">добавить главу в курс</Button>{' '}</td>
        </tr>
        )}
        
        
      </tbody>
    </Table>
      </Card.Body>
    </Card>
        </>
    )
}
export default MyTeacherCourses