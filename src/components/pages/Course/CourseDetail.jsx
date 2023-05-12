import { Container, Row, Col, Card, Image } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function CourseDetail() {
    let {course_id} = useParams()
      const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
<>
<Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe width="1024" height="768" src="https://www.youtube.com/embed/V06bw_qyRFY" title="Daft Punk Tribute - 1993 to 2021 // Thank you." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></Modal.Body>

      </Modal>
<Container>
    <Row className="mt-5">
        <Col md={4}><Image variant="top" src="/images/code.jpg" thumbnail />
        </Col>
        <Col md={8}>
            <h3>Название курса</h3>
            <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum</p>
            <p>Автор курса: <Link to='/teacher-detail/1'>Никнейм</Link></p>
            <p>Длительность курса:</p>
            <p>Количество учащихся:</p>
            <p>Оценка курса: например 5 или 4.9</p>
        </Col>
    </Row>
    <Card >
      <Card.Header>О курсе(дополнительные материалы)</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Введение в курс  <Button variant="primary" onClick={handleShow}>
        посомтреть видео
      </Button></ListGroup.Item>
    
      </ListGroup>
    </Card>
</Container>
</>
    )
}
export default CourseDetail