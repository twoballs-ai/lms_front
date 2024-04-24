import React from 'react';
import { Link } from "react-router-dom"



function SideBar() {
  return (
    <>

      <Card style={{ width: '18rem' }} className="border border-0 shadow ">
        <Card.Header as={Link} to="dashboard">Личный кабинет</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item action className="border border-0" as={Link} to="my-courses">Мои курсы</ListGroup.Item>
          <ListGroup.Item action className="border border-0" as={Link} to="add-course">Добавить курс</ListGroup.Item>
          <ListGroup.Item action className="border border-0" as={Link} to="my-students">Мои учащиеся</ListGroup.Item>
          {/* <ListGroup.Item as={Link} to="teacher-quizes">Квизы</ListGroup.Item>
        <ListGroup.Item as={Link} to="add-quiz">Добавить квиз</ListGroup.Item> */}
          <ListGroup.Item action className="border border-0" as={Link} to="profile-settings">Настройки профиля</ListGroup.Item>
          <ListGroup.Item action className="border border-0" as={Link} to="reset-password">Смена пароля</ListGroup.Item>
          <ListGroup.Item action className="border border-0 text-danger" as={Link} to="/logout">Выход</ListGroup.Item>
        </ListGroup>
      </Card>

    </>
  )

}

export default SideBar