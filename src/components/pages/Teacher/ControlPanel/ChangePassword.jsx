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
function ChangePassword() {
  const [teacherData, setTeacherData] = useState({
    password: ""
  })

  const teacherId = localStorage.getItem('teacherId')

  const handleChange = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value
    })
    //   console.log("teacherRegisterData : ")
    // console.log(teacherRegisterData)
  }
  const submitForm = (e) => {
    e.preventDefault()

    try {
      axios
        .post(baseUrl+ 'teacher/reset-password/'+ teacherId+'/' ,teacherData
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          ,{headers: { "Content-Type": "multipart/form-data" }}
        )
        .then(response => {
          console.log(response)
          if(response.status===200){
            window.location.href='/teacher-logout'
          } else{
            alert('пароль не сменен')
          }
          // window.location.href='/teacher-profile/my-courses'
          // Handle response

        });
    } catch (error) {
      console.log(error)
      setTeacherData({ "status": "error" })
    }

  }
  return (
    <>
        <Card >
      <Card.Header>Смена пароля</Card.Header>
      <Card.Body>

      <Form>
      <Form.Group className="mb-3" controlId="formBasicpassword">
                    <Form.Label>password</Form.Label>
                    <Form.Control  name="password" onChange={handleChange} type="text" placeholder="Введите ваш password" />
                  </Form.Group>
                  <Button onClick={submitForm} variant="primary" type="submit">
                    сменить пароль
                  </Button>
    </Form>
      </Card.Body>
    </Card>
 
    </>
  )

}

export default ChangePassword