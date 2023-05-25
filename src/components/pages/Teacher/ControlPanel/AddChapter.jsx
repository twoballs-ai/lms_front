import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'

function AddChapter() {
  // const teacherId= localStorage.getItem('teacherId')
  const {course_id} = useParams()
  const [chapterAddData, setChapterAddData] = useState({
    course: course_id,
    title:'',
    description:'',
    video:'',
    comment:''
  })

  // useEffect(()=>{
  //   axios
  //   .get(baseUrl+'category/'
  //     // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
  //     // ,{headers: { "Content-Type": "multipart/form-data" }}
  //     )
  //   .then(response => {
     
  //       setCategories(response.data)
  //   })
  // },[])

  const handleChange=(event)=>{
    setChapterAddData({
      ...chapterAddData,
      [event.target.name]: event.target.value
    })
    console.log(chapterAddData)
  }
  // const handleChange = (event)=>{
  //   setTeacherLoginData({
  //     ...teacherLoginData,
  //     [event.target.name]:event.target.value
  //   })
  //   console.log(teacherLoginData)
  // }

  const handleFileChange=(event)=>{
    setChapterAddData({
      ...chapterAddData,
      [event.target.name]:event.target.files[0]
    })
  }
  const formSubmit=(e)=>{
    e.preventDefault()

    axios
    .post(baseUrl+'chapter/', chapterAddData
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
      console.log(response)
 
      // window.location.href='/teacher-profile/my-courses'

    })
  }
    return(
        <>
        <Card>
        <Card.Header>Добавление главы</Card.Header>
       <Card.Body>
       <Form>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Название</Form.Label>
        <Form.Control name="title"  type="text" placeholder="категория" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Описание</Form.Label>
        <Form.Control name="description"   as="textarea" rows={3} placeholder="Описание" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Видео урок</Form.Label>
        <Form.Control name="video"   type="file" placeholder="Видео урок" onChange={handleFileChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Комментарии автора</Form.Label>
        <Form.Control name="comment" as="textarea" rows={3} placeholder="Комментарии автора" onChange={handleChange} />
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
export default AddChapter