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
        <ListGroup.Item as={Link} to="favorite-courses">Избранные курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="recommend-courses">Рекомендованные курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="incoming-task">Задачи с курсов</ListGroup.Item>
        <ListGroup.Item as={Link} to="profile-settings">Настройки профиля</ListGroup.Item>
        <ListGroup.Item as={Link} to="reset-password">Смена пароля</ListGroup.Item>
        <ListGroup.Item className="text-danger" as={Link} to="/user-login">Выход</ListGroup.Item>
      </ListGroup>
    </Card>

        </>
    )

}

export default SideBar