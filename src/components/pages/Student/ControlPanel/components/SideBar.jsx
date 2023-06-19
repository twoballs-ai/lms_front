import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import { useState, useEffect } from "react"
import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/api/'
function SideBar() { 
  const[notifyData, setNotifyData] = useState([])
  const studentId = localStorage.getItem('studentId')
  useEffect(() => {
    axios
      .get(baseUrl + 'student/get-all-notify/' + studentId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        console.log(response.data)
        setNotifyData(response.data)
      })
  }, [])
    return(
        <>
      
                <Card style={{ width: '18rem' }}>
      <Card.Header as={Link} to="dashboard">Личный кабинет</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item as={Link} to="my-courses">Мои курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="favorite-courses">Избранные курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="recommend-courses">Рекомендованные курсы</ListGroup.Item>
        <ListGroup.Item as={Link} to="incoming-task">Задачи с курсов<Badge className= "ms-2" bg="secondary">{notifyData.length}</Badge></ListGroup.Item>
        <ListGroup.Item as={Link} to="profile-settings">Настройки профиля</ListGroup.Item>
        <ListGroup.Item as={Link} to="reset-password">Смена пароля</ListGroup.Item>
        <ListGroup.Item className="text-danger" as={Link} to="/user-login">Выход</ListGroup.Item>
      </ListGroup>
    </Card>

        </>
    )

}

export default SideBar