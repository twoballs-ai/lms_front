import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const baseUrl = 'http://127.0.0.1:8000/api-quiz/'
function MyTeacherQuizes() {
  const [quizData, setQuizData] = useState([])
  const [totalResult, setTotalResult]= useState(0)
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
        setTotalResult(response.data.length)
        console.log(response.data)
        // setAvgRatingStatus
      })
  }, [totalResult])
  // console.log(courseData)
  const Swal = require('sweetalert2')
  const handleDeleteClick = (quiz_id)=>{
    Swal.fire({
      title: 'Подтвердите действие!',
      text: 'Вы собираетесь удалить квиз, вы уверены?',
      icon: 'info',
      confirmButtonText: 'Все равно удалить',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        try{
            axios.delete(baseUrl+'quiz/'+quiz_id)
            .then((response)=>{
              
              Swal.fire('success', 'Данные были удалены')
              setTotalResult(response.data.length)
              console.log(response.data.length)
            })
            // Swal.fire('success', 'Данные были удалены')
        }catch(error){
          Swal.fire('error', 'Данные не были удалены')
        }
      }else {
        Swal.fire('error', 'Данные не были удалены')
      }

    })
  }
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
                    <Button as={Link} to={'/teacher-profile/edit-quiz/' + quiz.id} variant="info">Редактировать <br/> данные квиза</Button>
                    <Button as={Link} to={'/teacher-profile/add-quiz-question/' + quiz.id} variant="primary">добавить вопрос <br/>в квиз</Button>
                    <Button onClick={()=>handleDeleteClick(quiz.id)} variant="danger"><FontAwesomeIcon icon={faTrashCan} />Удалить квиз</Button>{' '}
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