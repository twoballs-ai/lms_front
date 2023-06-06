import { Container, Row, Col, Card, Image } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Swal from 'sweetalert2'
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
const siteUrl = 'http://127.0.0.1:8000/'
const baseUrl = 'http://127.0.0.1:8000/api/'
function CourseDetail() {
  let { course_id } = useParams()
  const [show, setShow] = useState(false);
  const [courseData, setCourseData]= useState([])
  const [relatedCourseData, setRelatedCourseData]= useState([])
  const [technologicalListData, setTechnologicalListData]= useState([])
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
      setRelatedCourseData(JSON.parse(response.data.related_courses))
      setTechnologicalListData(response.data.technological_list)
      
      console.log(response.data)
    })
  },[course_id]) 
 const enrollCourse = () => {
  
  try{
    const studentId= localStorage.getItem('studentId')
    axios
    .post(baseUrl+'student-course-enroll/', {
      student: studentId,
      course: course_id
    }
      // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
      ,{headers: { "Content-Type": "multipart/form-data" }}
      )
    .then(response => {
      if(response.status===200||response.status===201){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'вы подписались на курс',
          toast:true,
          timerProgressBar:true,
          showConfirmButton: false,
          timer: 3000
        })
        // window.location.reload()
      }
    })
  } catch(error){
    console.log(error)
  }
 }
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
            <p>Автор курса: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
            <p>Технологии:&nbsp;
            {technologicalListData.map((tech,index)=>
             <Badge as={Link} to={`/courses-by-cat/${tech.trim()}`} pill bg="success">
           {tech.trim()}
          </Badge>
            )}
            </p>
            
            <p>Длительность курса:</p>
            <p>Количество учащихся:</p>
            <p>Оценка курса: например 5 или 4.9</p>
            <Button as={Link} to={"#"} onClick={enrollCourse} variant="primary">Подписаться на курс <FontAwesomeIcon icon={faCirclePlus} /></Button>{' '}

          </Col>
        </Row>
        <Card className="m-2">
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
        <Row className='mt-5'>

<hr />
<h3>Схожие курсы:</h3>
{relatedCourseData.map((related,index)=>
<Col>
  <Card style={{ width: '10rem' }}>
  <Link target="_blank"  to={`/detail/${related.pk}`}><Card.Img variant="top" src={`${siteUrl}media/${related.fields.course_image}`} /></Link>
    <Card.Body>
      <Card.Title><Link target="_blank" to={`/detail/${related.pk}`}>{related.fields.title}</Link></Card.Title>

    </Card.Body>
  </Card>
</Col>
)}
</Row >
      </Container>
    </>
  )
}
export default CourseDetail