import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function MyTeacherQuizes() {
  const [quizData, setQuizData] = useState([])
  const teacherId = localStorage.getItem('teacherId')
  // const [avgRatingStatus, setAvgRatingStatus] = useState("")
  // console.log(teacherId)
  useEffect(() => {
    axios
      .get(baseUrl + 'teacher-quiz/' + teacherId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setQuizData(response.data)
        console.log(response.data)
        // setAvgRatingStatus
      })
  }, [])
  // console.log(courseData)
  return (
    <>
      <Card>
        <Card.Header>Мои квизы</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>

                <th>Название</th>
                <th>кол-во вопросов</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {quizData.map((quiz, index) =>
                <tr key={index}>
                  <td>
                    <Link to={'/teacher-profile/all-question/' + quiz.id}>{quiz.title}</Link>
                    </td>
                    <td>
                    <Link to=''>12</Link>
                    </td>
                  <td>
                    <Button as={Link} to={'/teacher-profile/edit-course/' + quiz.id} variant="info">Редактировать <br/> данные курса</Button>{' '}
                    <Button as={Link} to={'/teacher-profile/add-chapter/' + quiz.id} variant="primary">добавить главу <br/> в курс</Button>{' '}
                    <Button variant="danger">Удалить <br/> курс</Button>{' '}
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
export default MyTeacherQuizes