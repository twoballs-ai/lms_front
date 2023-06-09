import { Link, useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const baseUrl = 'http://127.0.0.1:8000/api/'
function ProfileSettings() {
  const teacherId = localStorage.getItem('teacherId')
  const [teacherData, setTeacherData] = useState({
    full_name: "",
    email: "",
    qualification: "",
    phone: "",
    skills: "",
    status: ""
  })
  useEffect(()=>{
    axios
        .get(baseUrl+'teacher-courses-detail/'+teacherId
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          // ,{headers: { "Content-Type": "multipart/form-data" }}
          )
        .then(response => {
          setTeacherData({
            full_name: response.data.full_name,
              email: response.data.email,
              qualification: response.data.qualification,
              phone: response.data.phone,
              skills: response.data.skills,
              previous_teacher_image:'',
              teacher_image:'',
            })
          console.log(response.data)
        })
  },[])

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    })
    //   console.log("teacherRegisterData : ")
    // console.log(teacherRegisterData)
  }




  const submitForm = (e) => {
    e.preventDefault();
    const _formData = new FormData()
    _formData.append('category',teacherData.category)
    _formData.append('teacher',teacherId)
    _formData.append('title',teacherData.title)
    _formData.append('description',teacherData.description)
    if(teacherData.course_image !==''){
      _formData.append('course_image',teacherData.course_image,teacherData.course_image.name)
     }
    _formData.append('technologicals',teacherData.technologicals)
    console.log(teacherData)
    try {
      axios
        .post(baseUrl, teacherData
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        )
        .then(response => {
          console.log(response)
          setTeacherData({
            full_name: "",
            email: "",
            qualification: "",
            phone: "",
            skills: "",
            previous_course_image:'',
            course_image:'',
            status: "success"
            
          })
          // Handle response

        });
    } catch (error) {
      console.log(error)
      setTeacherData({ "status": "error" })
    }

  }
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if (teacherLoginStatus !== 'true') {
    window.location.href = '/teacher-login'
  }
  return (
    <>
        <Card>
              <Card.Header><h3>Регистрация нового пользователя</h3></Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicfull_name">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control value={teacherData.full_name} name="full_name" onChange={handleChange} type="text" placeholder="Введите ваше ФИО" />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Фотография профиля</Form.Label>
        <Form.Control value={teacherData.full_name} type="file" />
      </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>email</Form.Label>
                    <Form.Control value={teacherData.email} name="email" onChange={handleChange} type="email" placeholder="Введите ваш email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicqualification">
                    <Form.Label>Квалификация</Form.Label>
                    <Form.Control value={teacherData.qualification} name="qualification" onChange={handleChange} type="text" placeholder="Введите вашу квалификацию" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicphone">
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control value={teacherData.phone} name="phone" onChange={handleChange} type="text" placeholder="Введите имя пользователя" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicskills">
                    <Form.Label>Навыки</Form.Label>
                    <Form.Control value={teacherData.skills} name="skills" onChange={handleChange} as="textarea" placeholder="Введите имя пользователя" />
                  </Form.Group>
      
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check name="checkbox" onChange={handleChange} type="checkbox" label="Запомнить меня" />
                  </Form.Group>
                  <Button onClick={submitForm} variant="primary" type="submit">
                    Регистрация
                  </Button>
                </Form>
              </Card.Body>
            </Card>
 
    </>
  )

}

export default ProfileSettings