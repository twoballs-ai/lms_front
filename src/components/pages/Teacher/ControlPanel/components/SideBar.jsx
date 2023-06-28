import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'


function SideBar() { 
    return(
        <>
      
                <Card style={{ width: '18rem' }}>
      <Card.Header as={Link} to="dashboard">Личный кабинет</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item as={Link} to="my-courses">Мои курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="add-course">Добавить курс</ListGroup.Item>
        <ListGroup.Item as={Link} to="my-students">Мои учащиеся</ListGroup.Item>
        <ListGroup.Item as={Link} to="teacher-quizes">Квизы</ListGroup.Item>
        <ListGroup.Item as={Link} to="add-quiz">Добавить квиз</ListGroup.Item>
        <ListGroup.Item as={Link} to="profile-settings">Настройки профиля</ListGroup.Item>
        <ListGroup.Item as={Link} to="reset-password">Смена пароля</ListGroup.Item>
        <ListGroup.Item className="text-danger" as={Link} to="/teacher-logout">Выход</ListGroup.Item>
      </ListGroup>
    </Card>

        </>
    )

}

export default SideBar