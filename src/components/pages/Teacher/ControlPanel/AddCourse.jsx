import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'

function AddCourse() {
  const teacherId= localStorage.getItem('teacherId')
  const [categories,setCategories] = useState([])
  const [courseAddData, setCourseAddData] = useState({
    category:'',
    teacher: teacherId,
    title:'',
    description:'',
    course_image:'',
    technologicals:''
  })

  useEffect(()=>{
    axios
    .get(baseUrl+'category/'
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
     
        setCategories(response.data)
    })
  },[])

  const handleChange=(event)=>{
    setCourseAddData({
      ...courseAddData,
      [event.target.name]: event.target.value
    })
    console.log(courseAddData)
  }
  // const handleChange = (event)=>{
  //   setTeacherLoginData({
  //     ...teacherLoginData,
  //     [event.target.name]:event.target.value
  //   })
  //   console.log(teacherLoginData)
  // }

  const handleFileChange=(event)=>{
    setCourseAddData({
      ...courseAddData,
      [event.target.name]:event.target.files[0]
    })
  }
  const formSubmit=(e)=>{
    e.preventDefault()

    axios
    .post(baseUrl+'course/', courseAddData
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
 
      window.location.href='/teacher-profile/my-courses'

    })
  }
    return(
        <>
        <Card>
        <Card.Header>Добавление курса</Card.Header>
       <Card.Body>
       <Form>
       <Form.Group className="mb-3">
          <Form.Label htmlFor="categorySelect">Выберите категорию.</Form.Label>
          <Form.Select id="categorySelect" name="category" onChange={handleChange}>
            <option>Выберите категорию</option>
            {categories.map((category,index)=>{return<option key={index} value={category.id}>{category.title}</option>})}
          </Form.Select>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Название</Form.Label>
        <Form.Control name="title" value={categories.title} type="text" placeholder="категория" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Описание курса</Form.Label>
        <Form.Control name="description" value={categories.description}  as="textarea" rows={3} placeholder="Описание" onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Добавить заглавную картинку курса</Form.Label>
        <Form.Control name="course_image" type="file" onChange={handleFileChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Технологии</Form.Label>
        <Form.Control name="technologicals" as="textarea" rows={3} placeholder="Описание" onChange={handleChange} />
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
export default AddCourse