import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'

function AddQuiz() {
  const teacherId= localStorage.getItem('teacherId')
//   const [categories,setCategories] = useState([])
  const [quizData, setQuizData] = useState({
    title:'',
    detail:'',
    teacher: teacherId

  })


  const handleChange=(event)=>{
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value
    })
    console.log(quizData)
  }
  // const handleChange = (event)=>{
  //   setTeacherLoginData({
  //     ...teacherLoginData,
  //     [event.target.name]:event.target.value
  //   })
  //   console.log(teacherLoginData)
  // }

 
  const formSubmit=(e)=>{
    e.preventDefault()

    axios
    .post(baseUrl+'quiz/', courseAddData
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
 
      window.location.href='/add-quiz'

    })
  }
    return(
        <>
        <Card>
        <Card.Header>Добавление квиза</Card.Header>
       <Card.Body>
       <Form>


      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Название</Form.Label>
        <Form.Control name="title" value={categories.title} type="text" placeholder="категория" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Детали</Form.Label>
        <Form.Control name="detail" value={categories.detail}  as="textarea" rows={3} placeholder="Детали" onChange={handleChange} />
      </Form.Group>
      
      <Button onClick={formSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </Card.Body>
    </Card>
        </>
    )
}
export default AddQuiz