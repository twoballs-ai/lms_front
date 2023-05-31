import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import Image from 'react-bootstrap/Image';
const baseUrl = 'http://127.0.0.1:8000/api/'

function EditCourse() {
  const teacherId= localStorage.getItem('teacherId')
  const [categories,setCategories] = useState([])
  const {course_id} = useParams()
  const [courseEditData, setCourseEditData] = useState({
    category:'',
    title:'',
    description:'',
    previous_course_image:'',
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

    axios
        .get(baseUrl+'teacher-courses-detail/'+course_id
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          // ,{headers: { "Content-Type": "multipart/form-data" }}
          )
        .then(response => {
            setCourseEditData({
                category: response.data.category,
              title: response.data.title,
              description: response.data.description,
              previous_course_image: response.data.course_image,
              course_image: '',
              technologicals: response.data.technologicals
            })
          console.log(response.data)
        })
  },[])

  const handleChange=(event)=>{
    setCourseEditData({
      ...courseEditData,
      [event.target.name]: event.target.value
    })
    console.log(courseEditData)
  }
  // const handleChange = (event)=>{
  //   setTeacherLoginData({
  //     ...teacherLoginData,
  //     [event.target.name]:event.target.value
  //   })
  //   console.log(teacherLoginData)
  // }

  const handleFileChange=(event)=>{
    setCourseEditData({
      ...courseEditData,
      [event.target.name]:event.target.files[0]
    })
  }
  const formSubmit=(e)=>{
    e.preventDefault()
    const _formData = new FormData()
    _formData.append('category',courseEditData.category)
    _formData.append('teacher',teacherId)
    _formData.append('title',courseEditData.title)
    _formData.append('description',courseEditData.description)
    if(courseEditData.course_image !==''){
      _formData.append('course_image',courseEditData.course_image,courseEditData.course_image.name)
     }
    _formData.append('comment',courseEditData.comment)
    console.log(courseEditData)

    axios
    .put(baseUrl+'teacher-courses-detail/'+course_id, _formData
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
 
      if(response.status==200){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ваши данные обновлены',
          toast:true,
          timerProgressBar:true,
          showConfirmButton: false,
          timer: 3000
        })
      }
      window.location.href='/teacher-profile/my-courses'

    })
  }
    return(
        <>
        <Card>
        <Card.Header>Редактирование данных курса</Card.Header>
       <Card.Body>
       <Form>
       <Form.Group className="mb-3">
          <Form.Label htmlFor="categorySelect">Выберите категорию.</Form.Label>
          <Form.Select id="categorySelect" value={courseEditData.category} name="category" onChange={handleChange}>
            <option>Выберите категорию</option>
            {categories.map((category,index)=>{return<option key={index} value={category.id}>{category.title}</option>})}
          </Form.Select>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Название</Form.Label>
        <Form.Control name="title" value={courseEditData.title} type="text" placeholder="категория" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Описание курса</Form.Label>
        <Form.Control name="description" value={courseEditData.description}  as="textarea" rows={3} placeholder="Описание" onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Добавить заглавную картинку курса</Form.Label>
        <Form.Control name="course_image" type="file" onChange={handleFileChange} />
      </Form.Group>
      {courseEditData.previous_course_image && 
      <Image src={courseEditData.previous_course_image} rounded width="400" />
    // <img src={courseEditData.previous_course_image} width="400" />
    
}
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Технологии</Form.Label>
        <Form.Control value={courseEditData.technologicals} name="technologicals" as="textarea" rows={3} placeholder="Описание" onChange={handleChange} />
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
export default EditCourse