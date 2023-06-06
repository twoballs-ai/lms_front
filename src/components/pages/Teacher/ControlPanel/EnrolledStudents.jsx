import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function EnrolledStudents() {
  const [studentData, setStudentData] = useState([])
  let { course_id } = useParams()
  // console.log(teacherId)
  useEffect(() => {
    axios
      .get(baseUrl + 'enrolled-students/' + course_id
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setStudentData(response.data)
        console.log(response.data)
      })
  }, [])
  console.log()
  return (
    <>
      <Card>
        <Card.Header>Список подписавшихся на курс</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>

                <th>Имя</th>
                <th>Почта</th>
                <th>Имя пользователя(никнейм)</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) =>
                <tr key={index}>
                  <td><Link to={'/view-student' + student.student.id}>{student.student.full_name}</Link></td>
                  <td>{student.student.email}</td>
                  <td>{student.student.username}</td>
                  <td>
                    <Button as={Link} to={'/view-student/' + student.student.id} variant="info">Просомтреть профиль</Button>{' '}
                  </td>
                </tr>
              )}


            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}
export default EnrolledStudents