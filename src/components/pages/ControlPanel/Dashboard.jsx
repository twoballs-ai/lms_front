import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table';


function Dashboard() { 
    return(
        <>
        <Container>
            <Row>
               
                <aside className="col-md-3">
                <Card style={{ width: '18rem' }}>
      <Card.Header>Личный кабинет</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item as={Link} to="/">Мои курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="/">Избранные курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="/">Рекомендованные курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="/">Настройки профиля</ListGroup.Item>
        <ListGroup.Item as={Link} to="/">Смена пароля</ListGroup.Item>
        <ListGroup.Item className="text-danger" as={Link} to="/">Выход</ListGroup.Item>
      </ListGroup>
    </Card>
                </aside>
        
        <section className="col-md-8">
        <Card>
        <Card.Header>Мои курсы</Card.Header>
       <Card.Body>
       <Table striped bordered hover>
      <thead>
        <tr>
    
          <th>Название курса</th>
          <th>Создатель</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Python</td>
          <td><Link to='/'>Борис Богатырев</Link> </td>
          <td> <Button variant="danger">Удалить</Button>{' '}</td>
        </tr>
        
      </tbody>
    </Table>
      </Card.Body>
    </Card>
        </section>

    </Row>
    </Container>
        </>
    )

}

export default Dashboard