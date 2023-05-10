import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
function StudentLogin() { 
    return(
        <>
        <Container>
            <Row>
                <Col>
        <Card>
      <Card.Header><h3>Авторизация</h3></Card.Header>
      <Card.Body>
      <Form>
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
        Войти
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

export default StudentLogin