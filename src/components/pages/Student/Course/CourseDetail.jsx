import { Container, Row, Col, Card, Image } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup';
function CourseDetail() {
    let {course_id} = useParams()
    return(
<>
<Container>
    <Row className="mt-5">
        <Col md={4}><Image variant="top" src="/images/code.jpg" thumbnail />
        </Col>
        <Col md={8}>
            <h3>Название курса</h3>
            <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum</p>
            <p>Автор курса: <Link to='#'>Никнейм</Link></p>
            <p>Длительность курса:</p>
            <p>Количество учащихся:</p>
            <p>Оценка курса: например 5 или 4.9</p>
        </Col>
    </Row>
    <Card >
      <Card.Header>Intro</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>1 глава</ListGroup.Item>
        <ListGroup.Item>2 глава</ListGroup.Item>
        <ListGroup.Item>3 глава</ListGroup.Item>
      </ListGroup>
    </Card>
</Container>
</>
    )
}
export default CourseDetail