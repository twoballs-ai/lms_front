import Container from 'react-bootstrap/Container';
import React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';

const baseUrl = 'http://127.0.0.1:8000/api/'
function Home() {
  const [allCourseData, setAllCourseData] = useState([])
  const [popularCourseData, setPopularCourseData] = useState([])
  const [popularTeacherData, setPopularTeacherData] = useState([])
  const [studentTestimonialData, setStudentTestimonialData] = useState([])
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
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
      try{
        axios
        .get(baseUrl + 'popular-courses/?popular=1'
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          // ,{headers: { "Content-Type": "multipart/form-data" }}
        )
        .then(response => {
          setPopularCourseData(response.data)
          console.log(response.data)
        })
      }catch(error){
        console.log(error)
      }
      try{
        axios
        .get(baseUrl + 'popular-teachers/?popular=1'
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          // ,{headers: { "Content-Type": "multipart/form-data" }}
        )
        .then(response => {
          setPopularTeacherData(response.data)
          console.log(response.data)
        })
      }catch(error){
        console.log(error)
      }
      try{
        axios
        .get(baseUrl + 'student-testimonial/'
          // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
          // ,{headers: { "Content-Type": "multipart/form-data" }}
        )
        .then(response => {
          setStudentTestimonialData(response.data)
          console.log(response.data)
        })
      }catch(error){
        console.log(error)
      }
  }, [])
  console.log(popularCourseData)
  return (
    <>
      <Container>
        <h3 className='mt-5'>
        Новые добавленые курсы
        <Button className='float-end' as={Link} to={'/all-courses'} variant="success">Посмотреть все</Button>{' '}

          {/* Новые добавленые курсы <Link className='float-end' to={'/all-courses'}>Посмотреть все</Link> */}
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
                <span>Рейтинг курса: {course.course_rating}</span><br />
                <span>Просмотров курса: {course.course_views}</span>
              </Card.Footer>
            </Card>
          </Col>
          )}

 
        </Row >
        {/* popular courses */}
        <h3 className='mt-5'>
        Популярные курсы 
        <Button className='float-end' as={Link} to={'/popular-courses'} variant="success">Посмотреть популярные</Button>{' '}


        </h3>
        <Row className='mt-5'>
          <hr />
{popularCourseData && popularCourseData.map((course,index)=>

          <Col>
          <Card style={{ width: '18rem' }}>
          <Link to={`/detail/${course.course.id}`}><Card.Img variant="top" src={course.course.course_image} /></Link>
            <Card.Body>
              <Card.Title><Link to={`/detail/${course.course.id}`}>{course.course.title}</Link></Card.Title>

            </Card.Body>
            <Card.Footer>
              <span>Рейтинг курса: {course.rating}</span><br />
              <span>Просмотров курса: {course.course.course_views}</span>
            </Card.Footer>
          </Card>
        </Col>
)}
        </Row>
        <h3 className='mt-5'>
        Популярные наставники 
        <Button className='float-end' as={Link} to={'/popular-teachers'} variant="success">Посмотреть всех</Button>{' '}

          {/* Популярные наставники <Link className='float-end' to={'/popular-teachers'}>Посмотреть всех</Link> */}
        </h3>
        <Row className='mt-5'>

          <hr />
          {popularTeacherData && popularTeacherData.map((teacher,index)=>
          <Col>
            <Card style={{ width: '18rem' }}>
            <Link to={`teacher-detail/${teacher.id}`}><Card.Img variant="top" src={teacher.teacher_image} /></Link>
              <Card.Body>
                <Card.Title><Link to={`teacher-detail/${teacher.id}`}>{teacher.full_name}</Link></Card.Title>

              </Card.Body>
              <Card.Footer>
                Курсов добавлено: {teacher.total_teacher_courses}
              </Card.Footer>
            </Card>
          </Col>
          )}
        </Row >
        <h3 className='mt-5'>Отзывы студентов о курсах</h3>
        <hr />
        
        <Carousel className='bg-dark text-white py-5' activeIndex={index} onSelect={handleSelect}>
   
        {studentTestimonialData && studentTestimonialData.map((row,index)=>
      
      <Carousel.Item>
        <blockquote className="blockquote mb-0 text-center">
          <p>
          {row.review}
          </p>
          <footer className="blockquote-footer">
          название курса: {row.course.title}<cite title="Source Title"><br />Студент: {row.student.full_name}</cite>
          </footer>
        </blockquote>

        <Carousel.Caption>
      
        </Carousel.Caption>
      </Carousel.Item>
         )}
    </Carousel>
 
      </Container>
    </>
  );
}

export default Home;
