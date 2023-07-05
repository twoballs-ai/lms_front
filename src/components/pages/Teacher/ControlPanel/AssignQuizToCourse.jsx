import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const baseUrl = 'http://127.0.0.1:8000/api/'
const baseUrlQuiz = 'http://127.0.0.1:8000/api-quiz/'
function AssignQuiz() {
  const [quizData, setQuizData] = useState([])
  const [courseData, setCourseData] = useState([])
  const teacherId = localStorage.getItem('teacherId')
  const {course_id} = useParams()
  // const [avgRatingStatus, setAvgRatingStatus] = useState("")
  // console.log(teacherId)
  useEffect(() => {
    axios
      .get(baseUrlQuiz + 'teacher-quiz/' + teacherId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setQuizData(response.data)

        console.log(response.data)
        // setAvgRatingStatus
      })
      try {
        axios
          .get(baseUrl + 'course/' + course_id
            // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
            // ,{headers: { "Content-Type": "multipart/form-data" }}
          )
          .then(response => {
            setCourseData(response.data)
    
          })
      } catch (error) {
        console.log(error)
      }
  }, [])
  // console.log(courseData)
  const Swal = require('sweetalert2')
  const handleAssignQuiz = (quiz_id) => {

    try {

      axios
        .post(baseUrl + 'quiz-assign-course/', {
          quiz: quiz_id,
          course: course_id
        }
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          , { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Квиз успешно добавлен в квиз',
              toast: true,
              timerProgressBar: true,
              showConfirmButton: false,
              timer: 3000
            })
            
            // window.location.reload()
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Card>
        <Card.Header>Привязать квиз к курсу <span className="text-primary">({courseData.title})</span></Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>

                <th>Название</th>
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
                  {quiz.assign_status === 0 &&
                      <Button onClick={()=>handleAssignQuiz(quiz.id)} variant="success">Привязать квиз</Button>
                    }
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
export default AssignQuiz