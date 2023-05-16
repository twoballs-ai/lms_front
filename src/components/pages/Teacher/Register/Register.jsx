import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axios from "axios";

function TeacherRegister() { 
  const [teacherRegisterData, setTeacherRegisterData] = useState({
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    phone: "",
    skills: "",
    status: ""
  })

  const handleChange = (event) =>{
setTeacherRegisterData({
  ...teacherRegisterData,
  [event.target.name]:event.target.value
})
  }

const submitForm = ()=>{
  
}
  // useEffect(()=>{
  //   document.title = 'Регистрация наставника'
  // })
    return(
        <>
        <Container>
            <Row>
                <Col>
        <Card>
      <Card.Header><h3>Регистрация нового пользователя</h3></Card.Header>
      <Card.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ФИО</Form.Label>
        <Form.Control name="full_name" onChange={handleChange} type="text" placeholder="Введите ваше ФИО" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>email</Form.Label>
        <Form.Control name="email" onChange={handleChange} type="email" placeholder="Введите ваш email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Квалификация</Form.Label>
        <Form.Control name="qualification" onChange={handleChange} type="text" placeholder="Введите вашу квалификацию" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Номер телефона</Form.Label>
        <Form.Control name="phone" onChange={handleChange} type="text" placeholder="Введите имя пользователя" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Навыки</Form.Label>
        <Form.Control name="skills" onChange={handleChange} as="textarea" placeholder="Введите имя пользователя" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control name="password" onChange={handleChange} type="password" placeholder="Введите пароль" />
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
    </Col>
    </Row>
    </Container>
        </>
    )

}

export default TeacherRegister