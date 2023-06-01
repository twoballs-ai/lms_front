import { Container, Row, Col, Card, Image } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Swal from 'sweetalert2'
const baseUrl = 'http://127.0.0.1:8000/api/'
function CourseDetail() {
  let { course_id } = useParams()
  const [show, setShow] = useState(false);
  const [courseData, setCourseData]= useState([])
  const [teacherData, setTeacherData]= useState([])
  const [chapterData, setChapterData]= useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    axios
    .get(baseUrl+'course/'+course_id
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
      setCourseData(response.data)
      setTeacherData(response.data.teacher)
      setChapterData(response.data.course_chapters)
      console.log(response.data)
    })
  },[]) 
  return (
    <>
    
      <Container>
        <Row className="mt-5">
          <Col md={4}><Image variant="top" src={courseData.course_image} thumbnail />
          </Col>
          <Col md={8}>
            <h3>Курс: {courseData.title}</h3>
            <h5>Описание:</h5>
            <p>{courseData.description}</p>
            <p>Автор курса: <Link to='/teacher-detail/1'>{teacherData.full_name}</Link></p>
            <p>Длительность курса:</p>
            <p>Количество учащихся:</p>
            <p>Оценка курса: например 5 или 4.9</p>
          </Col>
        </Row>
        <Card >
          <Card.Header>главы курса</Card.Header>
          <ListGroup variant="flush">
          {chapterData.map((chapter,index)=>
            <ListGroup.Item key={index}>Глава {index+1}: {chapter.title} <Button variant="primary" onClick={handleShow}>
              посомтреть видео
            </Button>
            <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe width="1024" height="768" src={chapter.video} title={chapter.title}  allowFullScreen></iframe></Modal.Body>

      </Modal>
            </ListGroup.Item>
            
          )}
          </ListGroup>
        </Card>
      </Container>
    </>
  )
}
export default CourseDetail