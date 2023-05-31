import Container from 'react-bootstrap/Container';
import React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function Home() {
  const [allCourseData, setAllCourseData] = useState([])
  const teacherId = localStorage.getItem('teacherId')
  // console.log(teacherId)
  useEffect(() => {
    axios
      .get(baseUrl + 'course/?result=4'
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setAllCourseData(response.data)
        console.log(response.data)
      })
  }, [])
  return (
    <>
      <Container>
        <h3 className='mt-5'>
          Новые добавленые курсы <Link className='float-end' to={'/all-courses'}>Посмотреть все</Link>
        </h3>
        <Row className='mt-5'>

          <hr />
          {allCourseData && allCourseData.map((course,index)=>
          <Col>
            <Card style={{ width: '18rem' }}>
            <Link to={`/detail/${course.id}`}><Card.Img variant="top" src={course.course_image} /></Link>
              <Card.Body>
                <Card.Title><Link to={`/detail/${course.id}`}>{course.title}</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                <span>Рейтинг курса: 4.6 Сердечко иконка</span>
                <span>Просмотров курса:</span>
              </Card.Footer>
            </Card>
          </Col>
          )}

 
        </Row >
        {/* popular courses */}
        <h3 className='mt-5'>
          Популярные курсы <Link className='float-end' to={'/popular-courses'}>Посмотреть популярные</Link>
        </h3>
        <Row className='mt-5'>

          <hr />
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг курса: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Описание курса</Link></Card.Title>

              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h3 className='mt-5'>
          Популярные спикеры <Link className='float-end' to={'/popular-teachers'}>Посмотреть всех</Link>
        </h3>
        <Row className='mt-5'>

          <hr />
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={'/teacher-detail/1'}>Имя учителя</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг наставника: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Имя учителя</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг наставника: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={''}>Имя учителя</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг наставника: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/images/code.jpg" />
              <Card.Body>
                <Card.Title><Link to={'/teacher-detail/1'}>Имя учителя</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Рейтинг наставника: 4.6 Сердечко
              </Card.Footer>
            </Card>
          </Col>
        </Row >
      </Container>
    </>
  );
}

export default Home;
