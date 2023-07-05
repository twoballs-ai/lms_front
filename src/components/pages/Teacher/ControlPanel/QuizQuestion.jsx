import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
// import Swal from 'sweetalert2'

const baseUrl = 'http://127.0.0.1:8000/api-quiz/'

function QuizQuestion() {
    const [quizQuestionData, setQuizQuestionData]= useState([])
    const [totalResult, setTotalResult]= useState(0)
    const {quiz_id} = useParams()
// console.log(teacherId)
  useEffect(()=>{
    axios
    .get(baseUrl+'quiz-questions/'+quiz_id
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
        setQuizQuestionData(response.data)
        setTotalResult(response.data.length)
      console.log(response.data)
    })
  },[totalResult]) 
const Swal = require('sweetalert2')
  const handleDeleteClick = (question_id)=>{
    Swal.fire({
      title: 'Подтвердите действие!',
      text: 'Вы собираетесь удалить главу, вы уверены?',
      icon: 'info',
      confirmButtonText: 'Все равно удалить',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        try{
            axios.delete(baseUrl+'question-for-quiz/'+question_id)
            .then((response)=>{
              
              Swal.fire('success', 'Данные были удалены')
              setTotalResult(response.data.length)
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
    return(
<>
<Card>
        <Card.Header>Все вопросы квиза ({totalResult}) <Button className="float-end" as={Link} to={"/teacher-profile/add-quiz-question/"+ quiz_id}>Добавить вопрос для квиза</Button> </Card.Header>
       <Card.Body>
       <Table striped bordered hover>
      <thead>
        <tr>
    
          <th>вопрос</th>
          <th>действия</th>
 
        </tr>
      </thead>
      <tbody>
        {quizQuestionData.map((quiz,index)=>
        <tr key={index}>
          <td><Link to={"/teacher-profile/edit-question/"+quiz.id}variant="primary">{quiz.questions}</Link>{' '}</td>
          <td> 
          <Button as={Link} to={"/teacher-profile/edit-question/"+quiz.id}variant="primary"><FontAwesomeIcon icon={faPenToSquare} /></Button>{' '}
           <Button onClick={()=>handleDeleteClick(quiz.id)} variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>{' '}
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
export default QuizQuestion