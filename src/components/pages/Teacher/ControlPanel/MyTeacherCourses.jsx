import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const baseUrl = 'http://127.0.0.1:8000/api/'
function MyTeacherCourses() {
  const [courseData, setCourseData] = useState([])
  const [totalResult, setTotalResult]= useState(0)
  const teacherId = localStorage.getItem('teacherId')
  // const [avgRatingStatus, setAvgRatingStatus] = useState("")
  // console.log(teacherId)
  useEffect(() => {
    axios
      .get(baseUrl + 'teacher-courses/' + teacherId
        // ,{ headers: { Authorization: `Token da0d550bcc813a1b1cc6b905551cb11e3bf95046` } }
        // ,{headers: { "Content-Type": "multipart/form-data" }}
      )
      .then(response => {
        setCourseData(response.data)
        setTotalResult(response.data.length)
        console.log(response.data.length)
        // setAvgRatingStatus
      })
  }, [totalResult])
  const Swal = require('sweetalert2')
  const handleDeleteClick = (course_id)=>{
    Swal.fire({
      title: 'Подтвердите действие!',
      text: 'Вы собираетесь удалить квиз, вы уверены?',
      icon: 'info',
      confirmButtonText: 'Все равно удалить',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        try{
            axios.delete(baseUrl+'teacher-courses-detail/'+course_id)
            .then((response)=>{
              
              Swal.fire('success', 'Данные были удалены')
              setTotalResult(response.data.length)
              console.log(response.data.length)
            })
            // Swal.fire('success', 'Данные были удалены')
        }catch(error){
          Swal.fire('error', 'Данные не были удалены')
        }
      }else {
        Swal.fire('error', 'Данные не были удалены')
      }

    })
  }
  return (
    <>
      <Card>
        <Card.Header>Мои курсы</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>

                <th>Название курса</th>
                <th>Обложка</th>
                <th>Учеников на курсе</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((course, index) =>
                <tr key={index}>
                  <td>
                    <Link to={'/teacher-profile/all-chapters/' + course.id}>{course.title}</Link>
                    <hr />
                    {course.course_rating && 
                    <span>рейтинг курса:{course.course_rating}/5 </span>
                    }
                                  {!course.course_rating && 
                    <span>Ваш курс еще не оценили </span>
                    }
                    </td>
                  <td><img src={course.course_image} width="80" className="rounded float-start" alt={course.title} /></td>
                  <td><Link to={'/teacher-profile/enrolled-students/'+ course.id}>{course.total_enrolled_students}</Link> </td>
                  <td>
                    <Button as={Link} to={'/teacher-profile/edit-course/' + course.id} variant="info">Редактировать <br/> данные курса</Button>{' '}
                    <Button as={Link} to={'/teacher-profile/study-materials/' + course.id} variant="success">Добавить учебный<br/> материал</Button>{' '}
                    <Button as={Link} to={'/teacher-profile/add-chapter/' + course.id} variant="primary">добавить главу <br/> в курс</Button>{' '}
                    <Button as={Link} to={'/teacher-profile/assign-quiz/' + course.id} variant="warning">привязать <br/> квиз</Button>{' '}
                    <Button onClick={()=>handleDeleteClick(course.id)} variant="danger"><FontAwesomeIcon icon={faTrashCan} />Удалить <br/>курс</Button>{' '}
                  </td>
                </tr>
              )}


            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}
export default MyTeacherCourses