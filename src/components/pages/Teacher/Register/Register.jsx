import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
function TeacherRegister() { 
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
        <Form.Control type="text" placeholder="Введите ваше ФИО" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>email</Form.Label>
        <Form.Control type="email" placeholder="Введите ваш email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control type="text" placeholder="Введите имя пользователя" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить меня" />
      </Form.Group>
      <Button variant="primary" type="submit">
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